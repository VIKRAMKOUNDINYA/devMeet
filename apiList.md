API's for APP

authRouter
-POST /signUp
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

Status: ignore,intrested,accepted,rejected

connectionReqRouter
-POST /requet/send/intrested/:userId
-POST /requet/send/ignored/:userId
-POST /requet/review/accepted/:requestId
-POST /requet/review/rejected /:requestId

userRouter
-GET user/connections
-GET user/request/received
-GET user/feed