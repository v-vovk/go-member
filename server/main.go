package main

import (
	"encoding/json"
	"github.com/satori/go.uuid"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Contact struct {
	Id       uuid.UUID `json:"id"`
	Identity *Identity `json:"identity"`
}

type Identity struct {
	Name             string    `json:"name"`
	Email            string    `json:"email"`
	RegistrationDate time.Time `json:"registrationDate"`
}

var contacts []Contact

func getContacts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	err := json.NewEncoder(w).Encode(contacts)
	if err != nil {
		return
	}
}

func getContact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	candidateUuid, _ := uuid.FromString(vars["id"])

	for _, contact := range contacts {
		if contact.Id == candidateUuid {
			err := json.NewEncoder(w).Encode(contact)
			if err != nil {
				return
			}
			return
		}
	}

	err := json.NewEncoder(w).Encode(&Contact{})
	if err != nil {
		return
	}
}

func addContact(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		var candidateContact Contact
		_ = json.NewDecoder(r.Body).Decode(&candidateContact)

		isUnique := true

		for _, contact := range contacts {
			if contact.Identity.Email == candidateContact.Identity.Email {
				isUnique = false
				break
			}
		}

		if isUnique {
			candidateContact.Id, _ = uuid.NewV4()
			candidateContact.Identity.RegistrationDate = time.Now()

			contacts = append(contacts, candidateContact)

			err := json.NewEncoder(w).Encode(candidateContact)
			if err != nil {
				return
			}
		} else {
			w.WriteHeader(409)

			errApi := map[string]string{"error": "User with this email already exists, please try another one!"}

			err := json.NewEncoder(w).Encode(errApi)
			if err != nil {
				return
			}
		}
	}
}

func main() {
	router := mux.NewRouter().StrictSlash(true)

	// Initializing with some dummy data
	uuid1, _ := uuid.NewV4()
	contacts = append(contacts, Contact{
		Id:       uuid1,
		Identity: &Identity{Name: "Saray", Email: "saray-hlama@gmail.com", RegistrationDate: time.Now().UTC()}},
	)

	uuid2, _ := uuid.NewV4()
	contacts = append(contacts, Contact{
		Id:       uuid2,
		Identity: &Identity{Name: "Podval", Email: "podval-hlama@gmail.com", RegistrationDate: time.Now().UTC()}},
	)

	// Handling the endpoints
	router.HandleFunc("/api/contacts", getContacts).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/contacts/{id}", getContact).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/contacts", addContact).Methods("POST", "OPTIONS")

	// Running the Server
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS()(router)))
}
