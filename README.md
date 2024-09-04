As one of the world's top basketball leagues, the NBA (National Basketball Association) has attracted the attention of countless fans.

In order to gain a more intuitive understanding of recent NBA game information, team rankings, and data, this project utilizes technologies such as ECharts, JS, and Flask for visual presentation.

Through this approach, we can gain a more intuitive understanding of NBA games and provide fans with a better viewing experience.


In this project, we will share how to use ECharts, JS, and Flask to visualize NBA recent game information and team rankings.

Through this project, you can learn how to quickly build a data visualization web application by combining front-end and back-end technologies.

First, enter the app.py file and start the project

![image](https://github.com/user-attachments/assets/c64b16a2-a0d8-417a-83d5-26b96c271ee5)

After startup, the browser opens 127.0.0.1:5000

Effect after project initiation

Strictly speaking, the map presented in this project is not the map of a specific country. Due to the unique nature of the Toronto Raptors, I have included Ontario (Canada) in the map to present the Toronto Raptors. Therefore, it should be referred to as the NBA team distribution map

When you enter the project, present the map and ranking data of various NBA teams

I use three different colors to distinguish the positions of Eastern teams, Western teams, and Toronto Raptors

![image](https://github.com/user-attachments/assets/2a035a4c-98a3-4ed9-ac8b-bd091407acdb)

When you move the mouse to a state, all recent matches and upcoming matches in that state will be displayed on the right,And display the existing teams in the current state in the bubble

![image](https://github.com/user-attachments/assets/5383058d-0dcb-45fb-ad3e-39c6b75c8451)



This is the file tree structure of this project

![image](https://github.com/user-attachments/assets/5510e5f9-cfff-480e-8237-14037c1056d9)

The NBA game data and team ranking data for this project are sourced from an open interface

![image](https://github.com/user-attachments/assets/6f88d386-3d42-4ca3-b6d3-080016ad3aa7)


Here are the interface addresses

https://www.juhe.cn/docs/api/id/92

You need to register and apply for an API key to send requests for data retrieval

After you have a key, you need to configure it in the config. py file

![image](https://github.com/user-attachments/assets/7f811110-16c3-4405-8396-634b1d9f4957)

Of course, you can also simulate a fake data JSON instead of the data obtained by the API

Then we need to introduce echarts in the index.html page

![image](https://github.com/user-attachments/assets/7993dd37-3172-4d4b-bdfe-337a66fdf5c8)

Because the NBA includes the Toronto Raptors, we need to separately search for a Canadian map JSON data to extract data for Ontario and add it to the US map JSON data

![image](https://github.com/user-attachments/assets/e90deca9-ad8b-4301-88be-6ce71c6d4d3f)

Then we can present the map data of the United States on the page through JavaScript

The following is the technical document of echarts

https://echarts.apache.org/zh/api.html#echarts

Write two interfaces in our Flask backend. When the project starts, the user sends a request to your backend using JS, and then your backend requests the API to return data to the user's frontend
Interacting between the api.xpy file and the data_fetch.js file

![image](https://github.com/user-attachments/assets/74ccd9ee-388d-417e-8325-39f82a48b047)

![image](https://github.com/user-attachments/assets/33f69345-095a-4feb-a2d0-9274a32523c3)


After the project starts, we listen in index.js to ensure that both interfaces return results. Then, we start the functions in index.js to display the map and data on the page

![image](https://github.com/user-attachments/assets/dda794ac-f608-4ab7-b766-a33c671890a2)

Due to the recent NBA offseason, I am temporarily using fake JSON data in the project
If you need real data, don't forget to replace the interface address in api.py
![image](https://github.com/user-attachments/assets/8ff06927-6183-4a3b-bc63-04ca96b79cbf)


If anyone has better suggestions or questions, please feel free to discuss 😀

