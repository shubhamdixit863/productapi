package main

import (
	"backend/dto"
	"backend/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	invoices := []dto.Invoice{
		{ID: 1, Name: "Client A", Amount: "1000", Description: "Invoice for services rendered", CreationDate: "2021-01-01", Type: "AR", TransactionID: 23},
		{ID: 2, Name: "Client B", Amount: "1500", Description: "Invoice for product delivery", CreationDate: "2021-02-01", Type: "AP", TransactionID: 123},
		{ID: 3, Name: "Client C", Amount: "2000", Description: "Monthly consulting fees", CreationDate: "2021-03-01", Type: "AR", TransactionID: 203},
		{ID: 10, Name: "Client J", Amount: "5000", Description: "Annual subscription fees", CreationDate: "2021-10-01", Type: "AP", TransactionID: 12},
		{ID: 100, Name: "Client A", Amount: "1000", Description: "Invoice for services rendered", CreationDate: "2021-01-01", Type: "AR", TransactionID: 23},
		{ID: 209, Name: "Client B", Amount: "1500", Description: "Invoice for product delivery", CreationDate: "2021-02-01", Type: "AP", TransactionID: 123},
		{ID: 312, Name: "Client C", Amount: "2000", Description: "Monthly consulting fees", CreationDate: "2021-03-01", Type: "AR", TransactionID: 203},
		{ID: 110, Name: "Client J", Amount: "5000", Description: "Annual subscription fees", CreationDate: "2021-10-01", Type: "AP", TransactionID: 12},
	}
	handler := handlers.Handler{
		invoices,
	}
	e.Use(middleware.CORS())

	e.GET("/invoices", handler.GetAllInvoicesPaginated)
	e.GET("/invoicesAll", handler.GetAllInvoices)

	e.POST("/invoices", handler.SaveInvoice)
	e.PUT("/invoices/:id", handler.UpdateInvoice)
	e.DELETE("/invoices/:id", handler.DeleteInvoice)
	e.Logger.Fatal(e.Start(":8080"))

}
