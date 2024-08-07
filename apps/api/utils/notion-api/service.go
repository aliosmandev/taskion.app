package notionapi

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func HttpRequest(c *fiber.Ctx, url string, payload interface{}, method string) (map[string]interface{}, error) {
	var buffer *bytes.Buffer
	if payload != nil {
		payloadJson, err := json.Marshal(payload)
		if err != nil {
			return nil, c.Status(500).JSON(fiber.Map{"error": "Failed to marshal payload"})
		}
		buffer = bytes.NewBuffer(payloadJson)
	}

	var r *http.Request
	var err error
	if buffer != nil {
		r, err = http.NewRequest(method, url, buffer)
	} else {
		r, err = http.NewRequest(method, url, nil)
	}

	if err != nil {
		return nil, c.Status(500).JSON(fiber.Map{"error": "Failed to create request"})
	}

	Authorization := c.GetReqHeaders()["Authorization"]
	accessToken := Authorization[len(Authorization)-1][7:]

	r.Header.Set("Content-Type", "application/json")
	r.Header.Set("Authorization", "Bearer "+accessToken)
	r.Header.Set("Notion-Version", "2022-02-22")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return nil, c.Status(500).JSON(fiber.Map{"error": "Failed to execute request"})
	}
	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, c.Status(500).JSON(fiber.Map{"error": "Failed to read response body"})
	}

	if res.StatusCode != http.StatusOK {
		return nil, c.Status(res.StatusCode).JSON(fiber.Map{"error": string(bodyBytes)})
	}

	var responseBody map[string]interface{}
	err = json.Unmarshal(bodyBytes, &responseBody)
	if err != nil {
		fmt.Println(err)
		return nil, c.Status(500).JSON(fiber.Map{"error": "Failed to unmarshal response"})
	}

	return responseBody, nil
}
