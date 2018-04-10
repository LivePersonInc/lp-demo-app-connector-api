import {Component, Input, OnInit} from '@angular/core';
import {ConversationManager} from "../util/ConversationManager";

@Component({
  selector: 'app-lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.css']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversationManager: ConversationManager;

  public o = "{\n" +
    "    \"kind\": \"notification\",\n" +
    "    \"body\": {\n" +
    "        \"changes\": [\n" +
    "            {\n" +
    "                \"type\": \"UPSERT\",\n" +
    "                \"result\": {\n" +
    "                    \"convId\": \"0b58b8b7-bc04-4db1-a660-6f7c35a30df5\",\n" +
    "                    \"conversationDetails\": {\n" +
    "                        \"participants\": [\n" +
    "                            {\n" +
    "                                \"id\": \"559115b0af0c6ff448d447f1b4d63f5abeba1b5390d2b3f2fd7606fd77bb987a\",\n" +
    "                                \"role\": \"CONSUMER\"\n" +
    "                            }\n" +
    "                        ],\n" +
    "                        \"brandId\": \"le92127075\",\n" +
    "                        \"state\": \"CLOSE\",\n" +
    "                        \"closeReason\": \"CONSUMER\",\n" +
    "                        \"startTs\": 1523024414544,\n" +
    "                        \"endTs\": 1523024469170,\n" +
    "                        \"metaDataLastUpdateTs\": 1523024469174,\n" +
    "                        \"ttr\": {\n" +
    "                            \"ttrType\": \"PRIORITIZED\",\n" +
    "                            \"value\": 600\n" +
    "                        }\n" +
    "                    }\n" +
    "                }\n" +
    "            }\n" +
    "        ]\n" +
    "    },\n" +
    "    \"type\": \"cqm.ExConversationChangeNotification\"\n" +
    "}";

  constructor() { }

  ngOnInit() {
  }

}
