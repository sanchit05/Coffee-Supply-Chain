package utils

import (
	"fmt"
	"log"
	"time"
)

const DT_FORMAT = "01-02-2006 15:04:05.000000"

func LogMessage(method string, id string, message string, transactionID string) {
	dt := time.Now()
	logStr := fmt.Sprintf("%s:%s:%s:%s,%s", method, dt.Format(DT_FORMAT), id, message, transactionID)
	log.Println(logStr)
}
