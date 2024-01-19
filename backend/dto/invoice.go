package dto

import "time"

type Invoice struct {
	TransactionID   int       `json:"transactionId"`
	ID              int       `json:"id"`
	Type            string    `json:"type"`
	TransactionDate time.Time `json:"transactionDate"`
	Description     string    `json:"description"`
	Amount          string    `json:"amount"`
	CreationDate    string    `json:"creationDate"`
	Name            string    `json:"name"`
}
