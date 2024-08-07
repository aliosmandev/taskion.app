package blocks

type NotionSearchPayload struct {
	Sort Sort `json:"sort"`
}

type Sort struct {
	Direction string `json:"direction"`
	Timestamp string `json:"timestamp"`
}

type TodoPayload struct {
	Text    string `json:"text"`
	Checked bool   `json:"checked"`
}

type Annotations struct {
	Bold          bool   `json:"bold"`
	Code          bool   `json:"code"`
	Color         string `json:"color"`
	Italic        bool   `json:"italic"`
	Strikethrough bool   `json:"strikethrough"`
	Underline     bool   `json:"underline"`
}

type RichText struct {
	Annotations Annotations `json:"annotations"`
	Href        *string     `json:"href"`
	PlainText   string      `json:"plain_text"`
	Text        struct {
		Content string      `json:"content"`
		Link    interface{} `json:"link"`
	} `json:"text"`
	Type string `json:"type"`
}

type ToDo struct {
	Checked  bool       `json:"checked"`
	Color    string     `json:"color"`
	RichText []RichText `json:"rich_text"`
}

type Block struct {
	Object string `json:"object"`
	ToDo   ToDo   `json:"to_do"`
	Type   string `json:"type"`
}

type NotionBlock struct {
	Children []Block `json:"children"`
}

type UpdateRichText struct {
	Text UpdateText `json:"text"`
}

type UpdateToDo struct {
	Checked  bool             `json:"checked"`
	RichText []UpdateRichText `json:"rich_text"`
}

type UpdateBlockPayload struct {
	ToDo UpdateToDo `json:"to_do"`
}
