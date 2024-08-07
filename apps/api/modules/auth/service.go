package auth

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"os"

	"github.com/gofiber/fiber/v2"
)

func Authorize(c *fiber.Ctx) error {
	base, err := url.Parse(os.Getenv("NOTION_AUTHORIZE_URL"))
	if err != nil {
		return c.JSON(500, "error")
	}
	params := url.Values{}
	params.Add("response_type", "code")
	params.Add("owner", "user")
	params.Add("client_id", os.Getenv("NOTION_CLIENT_ID"))
	params.Add("redirect_uri", os.Getenv("NOTION_REDIRECT_URI"))

	base.RawQuery = params.Encode()

	return c.Redirect(base.String())
}

func Me(c *fiber.Ctx) error {

	var getUrl string = "https://api.notion.com/v1/users"

	r, err := http.NewRequest("GET", getUrl, nil)
	if err != nil {
		return c.JSON(500, "error")
	}

	Authorization := c.GetReqHeaders()["Authorization"]
	accessToken := Authorization[len(Authorization)-1][7:]

	r.Header.Set("Content-Type", "application/json")
	r.Header.Set("Authorization", "Bearer "+accessToken)
	r.Header.Set("Notion-Version", "2022-02-22")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return c.JSON(500, "error")
	}
	defer res.Body.Close()

	bodyBytes, _ := io.ReadAll(res.Body)

	if res.StatusCode != http.StatusOK {
		return c.Status(res.StatusCode).JSON(string(bodyBytes))
	}

	var responseBody map[string]interface{}

	err = json.Unmarshal(bodyBytes, &responseBody)
	if err != nil {
		return c.JSON(500, "error")
	}

	return c.JSON(responseBody)
}

func Callback(c *fiber.Ctx) error {
	var code string = c.Query("code")

	var postUrl string = "https://api.notion.com/v1/oauth/token"

	payload := NotionTokenPayload{
		GrantType:   "authorization_code",
		Code:        code,
		RedirectUri: os.Getenv("NOTION_REDIRECT_URI"),
	}

	payloadJson, err := json.Marshal(payload)
	if err != nil {
		return c.JSON(500, "error")
	}

	buffer := bytes.NewBuffer(payloadJson)

	r, err := http.NewRequest("POST", postUrl, buffer)
	if err != nil {
		return c.JSON(500, "error")
	}

	var notionBearer string = base64.StdEncoding.EncodeToString([]byte(os.Getenv("NOTION_CLIENT_ID") + ":" + os.Getenv("NOTION_CLIENT_SECRET")))

	r.Header.Set("Content-Type", "application/json")
	r.Header.Set("Authorization", "Basic "+notionBearer)
	r.Header.Set("Notion-Version", "2022-06-28")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return c.JSON(500, "error")
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(res.Body)
		return c.Status(res.StatusCode).JSON(string(bodyBytes))
	}

	var tokenResponse NotionTokenResponse

	if err := json.NewDecoder(res.Body).Decode(&tokenResponse); err != nil {
		return c.Status(500).JSON("error decoding response")
	}

	var url = os.Getenv("APP_URL") + "callback?accessToken=" + tokenResponse.AccessToken

	return c.Redirect(url)
}
