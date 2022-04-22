package api

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type ListItem struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
	Open        bool   `json:"open"`
}

var db *sql.DB
var err error

func SetupPostgres() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	host := os.Getenv("APP_DB_HOST")
	port, err := strconv.Atoi(os.Getenv("APP_DB_PORT"))
	if err != nil {
		fmt.Println("Error converting port: ", err)
	}
	user := os.Getenv("APP_DB_USERNAME")
	dbname := os.Getenv("APP_DB_NAME")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"dbname=%s sslmode=disable",
		host, port, user, dbname)

	db, err = sql.Open("postgres", psqlInfo)

	if err != nil {
		fmt.Println(err.Error())
	}

	if err = db.Ping(); err != nil {
		fmt.Println(err.Error())
	}

	log.Println("connected to postgres")
}

// CRUD: Create Read Update Delete API Format

// List all items
func GetItems(c *gin.Context) {
	// Use SELECT Query to obtain all rows
	rows, err := db.Query("SELECT * from shoppinglist")
	if err != nil {
		fmt.Println(err.Error())
		//c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
	}

	// Get all rows and add into items
	items := make([]ListItem, 0)

	if rows != nil {
		defer rows.Close()
		for rows.Next() {
			// Individual row processing
			item := ListItem{}
			if err := rows.Scan(&item.Name, &item.Description, &item.Quantity, &item.Open); err != nil {
				fmt.Println(err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}
			item.Name = strings.TrimSpace(item.Name)
			items = append(items, item)
		}
	}

	// Return JSON object of all rows
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	c.JSON(http.StatusOK, gin.H{"items": items})
}

//Get an item
func GetItem(c *gin.Context) {
	// Use SELECT Query to obtain all rows
	itemName := c.Param("itemName")

	rows, err := db.Query("SELECT * FROM shoppinglist WHERE name = ($1)", itemName)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
	}

	// Get all rows and add into items
	items := make([]ListItem, 0)

	if rows != nil {
		defer rows.Close()
		for rows.Next() {
			// Individual row processing
			item := ListItem{}
			if err := rows.Scan(&item.Name, &item.Description, &item.Quantity, &item.Open); err != nil {
				fmt.Println(err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}
			item.Name = strings.TrimSpace(item.Name)
			items = append(items, item)
		}
	}

	// Return JSON object of all rows
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	c.JSON(http.StatusOK, gin.H{"items": items})
}

//Create item and add to DB
func AddItem(c *gin.Context) {
	var req ListItem
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate item
	if len(req.Name) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an item name"})
	} else {
		// Create item
		var Item ListItem

		Item.Name = req.Name
		Item.Description = req.Description
		Item.Quantity = req.Quantity
		Item.Open = req.Open

		// Insert item to DB
		sqlStatement := `
		INSERT INTO shoppinglist(name, description, quantity, open)
		VALUES ($1, $2, $3)`
		_, err = db.Exec(sqlStatement, Item.Name, Item.Description, Item.Quantity, Item.Open)
		if err != nil {
			panic(err)
		}

		// Log message
		log.Println("created shopping list item", Item.Name)

		// Return success response
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
		c.JSON(http.StatusCreated, gin.H{"items": &Item})
	}
}

// // Update item
func UpdateItem(c *gin.Context) {
	itemName := c.Param("itemName")
	newName := c.Param("newName")
	description := c.Param("description")
	quantity := c.Param("quantity")
	open := c.Param("open")

	// Validate id and done
	if len(itemName) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an item"})
	} else {
		// Find and update the item
		var exists bool
		err := db.QueryRow("SELECT * FROM shoppinglist WHERE name=$1;", itemName).Scan(&exists)
		if err != nil && err == sql.ErrNoRows {
			fmt.Println(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		} else {
			_, err := db.Query("UPDATE shoppinglist SET name=$2, description=$3, quantity=$4, open=$5 WHERE name=$1;", itemName, newName, description, quantity, open)
			if err != nil {
				fmt.Println(err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}

			// Log message
			log.Println("updated item", newName)

			// Return success response
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
			c.JSON(http.StatusOK, gin.H{"message": "successfully updated item", "item": newName})
		}
	}
}

// // Delete item
func DeleteItem(c *gin.Context) {
	itemName := c.Param("itemName")

	// Validate id
	if len(itemName) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an item"})
	} else {
		// Find and delete the item
		var exists bool
		err := db.QueryRow("SELECT * FROM shoppinglist WHERE name=$1;", itemName).Scan(&exists)
		if err != nil && err == sql.ErrNoRows {
			fmt.Println(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		} else {
			_, err = db.Query("DELETE FROM shoppinglist WHERE name=$1;", itemName)
			if err != nil {
				fmt.Println(err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}

			// Log message
			log.Println("deleted item", itemName)

			// Return success response
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
			c.JSON(http.StatusOK, gin.H{"message": "successfully deleted item", "itemName": itemName})
		}
	}
}
