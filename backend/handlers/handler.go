package handlers

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"backend/dto"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	Invoices []dto.Invoice
}

// GetAllInvoicesPaginated returns a paginated list of invoices
func (h *Handler) GetAllInvoicesPaginated(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	start := (page - 1) * limit
	end := start + limit
	if end > len(h.Invoices) {
		end = len(h.Invoices)
	}

	if start > len(h.Invoices) {
		return c.JSON(http.StatusNotFound, "Page not found")
	}

	// Create a response struct
	type response struct {
		Invoices   []dto.Invoice `json:"invoices"`
		TotalItems int           `json:"totalItems"`
	}

	// Prepare and send the response
	resp := response{
		Invoices:   h.Invoices[start:end],
		TotalItems: len(h.Invoices),
	}

	return c.JSON(http.StatusOK, resp)
}

func (h *Handler) GetAllInvoices(c echo.Context) error {
	// Create a response struct
	type response struct {
		Invoices   []dto.Invoice `json:"invoices"`
		TotalItems int           `json:"totalItems"`
	}

	// Prepare and send the response
	resp := response{
		Invoices:   h.Invoices,
		TotalItems: len(h.Invoices),
	}

	return c.JSON(http.StatusOK, resp)
}

// SaveInvoice handles creating a new invoice
func (h *Handler) SaveInvoice(c echo.Context) error {
	var newInvoice dto.Invoice
	if err := c.Bind(&newInvoice); err != nil {
		return err
	}
	newInvoice.TransactionDate = time.Now()
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)
	newInvoice.TransactionID = r1.Int()
	h.Invoices = append(h.Invoices, newInvoice)

	return c.JSON(http.StatusCreated, newInvoice)
}

// UpdateInvoice handles updating an existing invoice
func (h *Handler) UpdateInvoice(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var updatedInvoice dto.Invoice
	if err := c.Bind(&updatedInvoice); err != nil {
		return err
	}

	for i, invoice := range h.Invoices {
		if invoice.ID == id {
			h.Invoices[i] = updatedInvoice
			return c.JSON(http.StatusOK, updatedInvoice)
		}
	}

	return c.JSON(http.StatusNotFound, "Invoice not found")
}

// DeleteInvoice handles deleting an invoice
func (h *Handler) DeleteInvoice(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for i, invoice := range h.Invoices {
		if invoice.ID == id {
			h.Invoices = append(h.Invoices[:i], h.Invoices[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}

	return c.JSON(http.StatusNotFound, "Invoice not found")
}
