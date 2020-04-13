let mydata = {
    "twilio": {
        "chat": {
            "ChannelSid": "CHd3aef26c814d42e3bb35d6bfa19a9dc4",
                "AssistantName": "",
                "Attributes": {},
            "ServiceSid": "IS423a82f5afb64517a2d93d9082a9f4e5",
                "To": "Saada",
                "From": "vDTXc3iRIn4RwM9dyItFadqKTP0NNTSb",
                "MessageSid": "IMb76f1b92440e41359dcfee10784ba0e9"
        },
        "collected_data": {
            "yesNo": {
                "answers": {
                    "yesNo": {
                        "confirm_attempts": 0,
                            "filled": false,
                            "error": {
                            "message": "Invalid Value",
                                "value": "abc123"
                        },
                        "type": "Twilio.YES_NO",
                            "confirmed": false,
                            "validate_attempts": 4,
                            "attempts": 4
                    }
                },
                "date_completed": "2020-04-06T08:47:58Z",
                    "date_started": "2020-04-06T08:47:10Z",
                    "status": "validation-max-attempts"
            },
            "CollectInfo": {
                "answers": {
                    "phone": {
                        "confirm_attempts": 0,
                            "answer": "761432208",
                            "filled": true,
                            "type": "Twilio.PHONE_NUMBER",
                            "confirmed": false,
                            "validate_attempts": 1,
                            "attempts": 1
                    },
                    "last_name": {
                        "confirm_attempts": 0,
                            "answer": "hammond",
                            "filled": true,
                            "confirmed": false,
                            "validate_attempts": 1,
                            "attempts": 1
                    },
                    "id": {
                        "answer": "2001014800086",
                            "type": "Twilio.NUMBER",
                            "filled": true,
                            "attempts": 1,
                            "validate_attempts": 1,
                            "confirm_attempts": 0,
                            "confirmed": false
                    },
                    "first_name": {
                        "confirm_attempts": 0,
                            "answer": "suri",
                            "filled": true,
                            "confirmed": false,
                            "validate_attempts": 1,
                            "attempts": 1
                    }
                },
                "date_completed": "2020-04-06T08:48:27Z",
                    "date_started": "2020-04-06T08:48:05Z",
                    "status": "complete"
            }
        }
    },
    "sendToAgent": true

};
const flattened = {};
Object.keys(mydata.twilio.collected_data.CollectInfo.answers).forEach(key=>{
   flattened[key]= mydata.twilio.collected_data.CollectInfo.answers[key].answer;
});
console.log(flattened);