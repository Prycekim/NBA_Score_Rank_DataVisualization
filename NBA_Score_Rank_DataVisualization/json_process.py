import json


def json_process_score(data):
    # 转换为二维列表
    matches_list = []

    for match_day in data["result"]["matchs"]:
        date = match_day["date"]
        for match in match_day["list"]:
            matches_list.append([
                match["team1"],
                match["team2"],
                match["status_text"],
                match["team1_score"],
                match["team2_score"],
                date
            ])

    # 打印结果
    return matches_list


if __name__ == '__main__':
    pass
