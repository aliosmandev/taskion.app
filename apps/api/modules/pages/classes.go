package pages

type NotionSearchPayload struct {
	Sort Sort `json:"sort"`
}

type Sort struct {
	Direction string `json:"direction"`
	Timestamp string `json:"timestamp"`
}
