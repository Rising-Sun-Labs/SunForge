# Notion like replica

This is POC project for Go/Java Backend and ReactJS Frontend


## System design for this app
## Step 1. Requirements:
      -> Functional Requirement:
        - User's should be able to create new service page from available services (Current available services: **File upload**, **README.md file**, "To Do Task Management", etc)
        - User's should get all his/her saved services.
        - User's should be able marked service page as favourite.
        - User's should be able to remove his/her created service page.

      -> Non Functional Requirement: 
        - Number of users: 10000 (Monthly).
        - Low latency (close to real time): no one want to wait for request to take more time than need, so low latency is important for quick response. 
        - Highly available : since operations are going to carry out in regular basic, user can access the service anytime. sor high availability is must.
        
            
## Step 2: Assumptions and estimate:
            - Users per day : 10000/30 = 333 users using per day 
            - Traffic volumes or Request : lets say 50 req/user, monthly request : 50*10000/30=5*333.33=1666.67 request/month.
            - Data size: "Each document is <1MB", "we can expect 100M documents in 1 year".
            - payload size: < less than 1mb.
            - payload body:{userId:"", directoryInformation:{}, fileContents:"", filesize:""}
            - Headers: (Authorization, Content-Type)
            - Metadata (Ip, locations etc)

## Step 3: High Level Design with data flow and digram with major components:







