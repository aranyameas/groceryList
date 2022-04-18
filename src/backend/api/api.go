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
	Item   string `json:"item"`
	Description string `json:"description"`
	Quantity int   `json:"quantity"`
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
		if err!= nil {
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
			if err := rows.Scan(&item.Item, &item.Description, &item.Quantity); err != nil {
				fmt.Println(err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}
			item.Item = strings.TrimSpace(item.Item)
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

	rows, err := db.Query("SELECT * FROM shoppinglist WHERE item = ($1)", itemName)
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
			if err := rows.Scan(&item.Item, &item.Description, &item.Quantity); err != nil {
				fmt.Println(err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"message": "error with DB"})
			}
			item.Item = strings.TrimSpace(item.Item)
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
	item := c.Param("itemName")
	description := c.Param("description")
	quantity := c.Param("quantity")

	// Validate item
	if len(item) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an item name"})
	} else {
		// Create item
		var Item ListItem

		Item.Item = item
		Item.Description = description
		Item.Quantity, err = strconv.Atoi(quantity)
		if err != nil {
			fmt.Println(err)
	  }

		// Insert item to DB
		sqlStatement := `
		INSERT INTO shoppinglist(item, description, quantity)
		VALUES ($1, $2, $3)`
		_, err = db.Exec(sqlStatement, Item.Item, Item.Description, Item.Quantity)
		if err != nil {
  			panic(err)
		}


		// Log message
		log.Println("created shopping list item", item)

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

	// Validate id and done
	if len(itemName) == 0 {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "please enter an item"})
	} else {
		// Find and update the item
		var exists bool
		err := db.QueryRow("SELECT * FROM shoppinglist WHERE item=$1;", itemName).Scan(&exists)
		if err != nil && err == sql.ErrNoRows {
			fmt.Println(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		} else {
			_, err := db.Query("UPDATE shoppinglist SET item=$2, description=$3, quantity=$4 WHERE item=$1;", itemName, newName, description, quantity)
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
		err := db.QueryRow("SELECT * FROM shoppinglist WHERE item=$1;", itemName).Scan(&exists)
		if err != nil && err == sql.ErrNoRows {
			fmt.Println(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		} else {
			_, err = db.Query("DELETE FROM shoppinglist WHERE item=$1;", itemName)
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
