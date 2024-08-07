package blocks

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"

	notionapi "taskmanager/utils/notion-api"
)

func getBlocks(c *fiber.Ctx) error {

	var pageId string = c.Params("pageId")
	var getUrl string = "https://api.notion.com/v1/blocks/" + pageId + "/children?page_size=100"

	var responseBody, _ = notionapi.HttpRequest(c, getUrl, nil, "GET")

	return c.JSON(responseBody)
}

func createBlock(c *fiber.Ctx) error {
	var pageId string = c.Params("pageId")
	var postUrl string = "https://api.notion.com/v1/blocks/" + pageId + "/children"

	payload := new(TodoPayload)

	if err := c.BodyParser(payload); err != nil {
		log.Info("error = ", err)
		return c.SendStatus(200)
	}

	var requestPayload NotionBlock

	requestPayload.Children = append(requestPayload.Children, Block{
		Object: "block",
		Type:   "to_do",
		ToDo: ToDo{
			Checked: payload.Checked,
			Color:   "default",
			RichText: []RichText{
				{
					Annotations: Annotations{
						Bold:          false,
						Code:          false,
						Color:         "default",
						Italic:        false,
						Strikethrough: false,
						Underline:     false,
					},
					Text: struct {
						Content string      `json:"content"`
						Link    interface{} `json:"link"`
					}{
						Content: payload.Text,
					},
					PlainText: payload.Text,
					Type:      "text",
				},
			},
		},
	})

	var responseBody, _ = notionapi.HttpRequest(c, postUrl, requestPayload, "PATCH")

	return c.JSON(responseBody)
}

type UpdateText struct {
	Content string `json:"content"`
}

func updateBlock(c *fiber.Ctx) error {
	var blockId string = c.Params("blockId")

	var updateUrl string = "https://api.notion.com/v1/blocks/" + blockId

	payload := new(UpdateBlockPayload)

	if err := c.BodyParser(payload); err != nil {
		log.Info("error = ", err)
		return c.SendStatus(200)
	}

	var requestPayload UpdateBlockPayload

	requestPayload.ToDo.Checked = payload.ToDo.Checked
	requestPayload.ToDo.RichText = []UpdateRichText{
		{
			Text: UpdateText{
				Content: payload.ToDo.RichText[0].Text.Content,
			},
		},
	}

	var responseBody, _ = notionapi.HttpRequest(c, updateUrl, requestPayload, "PATCH")

	return c.JSON(responseBody)
}

func deleteBlock(c *fiber.Ctx) error {
	var blockId string = c.Params("blockId")

	var deleteUrl string = "https://api.notion.com/v1/blocks/" + blockId

	var responseBody, _ = notionapi.HttpRequest(c, deleteUrl, nil, "DELETE")

	return c.JSON(responseBody)
}
