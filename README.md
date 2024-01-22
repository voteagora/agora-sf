# TODO:

The structure of navigating these files. Top level:
- /meetings - this is a list of "files" (aka legislation) that were worked on in the meeting. Each File # is very important, that's how we will find useful information later on. Sample https://sfgov.s3.us-east-1.amazonaws.com/meetings/2023-06-09-Budget%20and%20Appropriations%20Committee.json

- /actions - this is a summary of all the actions taken on a file.  Sample:  https://sfgov.s3.us-east-1.amazonaws.com/actions/230642.json

- /packets - this is the board packet for a given file. There is usually only one per file, but if there is more than one, I simply did not download the second

- /chatgpt - this is where the chatgpt summary lives. It should have the same format, but it is not guaranteed. Will need to do some cleanup. I was only able to generate some of them as it started failing recently. But here is a sample https://sfgov.s3.us-east-1.amazonaws.com/chatgpt/230567.json