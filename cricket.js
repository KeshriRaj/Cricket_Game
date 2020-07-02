var Team = /** @class */ (function () {
    function Team(TeamList, team_name) {
        var _this = this;
        this.i = 0;
        this.j = 0;
        this.start = false;
        this.stop = false;
        this.check_play = false;
        this.Team_total = 0;
        this.once = true;
        this.top_scorer = { run: 0, Player_Id: "", total: 0 };
        this.start_playing = function () {
            _this.check_play = true;
            setTimeout(function () {
                console.log(3);
                setTimeout(function () {
                    console.log(2);
                    setTimeout(function () {
                        console.log(1);
                        setTimeout(function () {
                            _this.start = true;
                            _this.stop = true;
                            console.log("Match started");
                            var seconds = 60;
                            console.log("outer", seconds);
                            var x = function () {
                                if (!(_this.start) || seconds < 0) {
                                    document.getElementById("timer").innerHTML = "";
                                    return;
                                }
                                console.log(seconds);
                                document.getElementById("timer").innerHTML = seconds.toString() + "s";
                                setTimeout(function () {
                                    seconds--;
                                    x();
                                }, 1000);
                            };
                            x();
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
            setTimeout(function () {
                _this.start = false;
            }, 60000);
        };
        this.get_runs = function () {
            var table_val = document.getElementById(_this.team_name);
            var col = 7;
            if (_this.i < 10 && _this.start) {
                var runs = Math.floor(Math.random() * (7 - 0));
                _this.TeamList[_this.i].player.push(runs);
                table_val.rows[_this.i + 1].cells[Number(_this.j) + 1].innerHTML = runs.toString();
                console.log("Player ", _this.i + 1, " Ball ", _this.j + 1, " = ", _this.TeamList[_this.i].player[_this.j], "Runs");
                if (_this.j == 5 || _this.TeamList[_this.i].player[_this.j] == 0) {
                    console.log(" Total Runs = ", _this.TeamList[_this.i].total_run);
                    _this.TeamList[_this.i].total_run += _this.TeamList[_this.i].player[_this.j];
                    table_val.rows[_this.i + 1].cells[col].innerHTML = (_this.TeamList[_this.i].total_run).toString();
                    if (_this.top_scorer.run < _this.TeamList[_this.i].total_run) {
                        _this.top_scorer.run = Math.max(_this.top_scorer.run, _this.TeamList[_this.i].total_run);
                        _this.top_scorer.Player_Id = "Player ".concat((_this.i + 1).toString());
                    }
                    _this.i++;
                    _this.j = 0;
                }
                else {
                    _this.Team_total += _this.TeamList[_this.i].player[_this.j];
                    _this.TeamList[_this.i].total_run += _this.TeamList[_this.i].player[_this.j];
                    console.log("  Total Runs = ", _this.TeamList[_this.i].total_run);
                    _this.j++;
                }
            }
            else {
                if (!_this.stop && !_this.start) {
                    if (_this.check_play)
                        alert("Match will start in 3 seconds ........");
                    else
                        alert("Please press the PLAY TEAM1 or PLAY TEAM2");
                }
                else {
                    _this.start = false;
                    alert("Cannot Hit as Match is Over");
                }
            }
            _this.team_total();
        };
        this.display_runs = function () {
            _this.TeamList.forEach(function (element) {
                element.player.forEach(function (element2) {
                    console.log(element2);
                });
            });
        };
        this.team_total = function () {
            if (_this.team_name == "team1")
                document.getElementById("score1").innerHTML = _this.Team_total.toString();
            else if (_this.team_name == "team2")
                document.getElementById("score2").innerHTML = _this.Team_total.toString();
            console.log(_this.Team_total);
            _this.top_scorer.total = _this.Team_total;
            console.log(_this.top_scorer);
        };
        this.TeamList = TeamList;
        this.team_name = team_name;
    }
    return Team;
}());
var Team1 = new Team([{ player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
], "team1");
var Team2 = new Team([{ player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
    { player: [], total_run: 0 },
], "team2");
var team1_total = Team1.top_scorer;
var team2_total = Team2.top_scorer;
var maxTeam1 = Team1.top_scorer;
var maxTeam2 = Team2.top_scorer;
var query = -1;
var generate_result = function () {
    var px = true;
    console.log(team2_total.total);
    if (Number(team1_total.total) > Number(team2_total.total) && team1_total.total != 0 && team2_total.total != 0) {
        document.getElementById("won").innerHTML = "MATCH WON BY TEAM1 ";
        query = 1;
    }
    else if (Number(team1_total.total) < Number(team2_total.total) && team1_total.total != 0 && team2_total.total != 0) {
        document.getElementById("won").innerHTML = "MATCH WON BY TEAM2 ";
        query = 2;
    }
    else if (Number(team1_total.total) == Number(team2_total.total) && team1_total.total != 0)
        document.getElementById("won").innerHTML = "MATCH DRAW ";
    else {
        document.getElementById("won").innerHTML = "BOTH TEAM HAS NOT PLAYED ";
        px = false;
    }
    if (!px)
        document.getElementById("mom").innerHTML = "";
    else {
        if (Number(maxTeam1.run) > Number(maxTeam2.run)) {
            document.getElementById("mom").innerHTML = "Man of the Match :"
                + maxTeam1.Player_Id +
                " Team 1 Score:"
                + maxTeam1.run;
        }
        else if (Number(maxTeam1.run) < Number(maxTeam2.run)) {
            document.getElementById("mom").innerHTML = "Man of the Match : " + maxTeam2.Player_Id + " Team 2 Score:" + maxTeam2.run;
        }
        else {
            if (query == 1)
                document.getElementById("mom").innerHTML = "Man of the Match : " + maxTeam1.Player_Id + " Team 1 Score:" + maxTeam1.run;
            else if (query == 2)
                document.getElementById("mom").innerHTML = "Man of the Match : " + maxTeam2.Player_Id + " Team 2 Score:" + maxTeam2.run;
            else
                document.getElementById("mom").innerHTML = "Man of the Match : " + maxTeam1.Player_Id + " Team 1 Score:" + maxTeam1.run + "</br>" + "Man of the Match : " + maxTeam2.Player_Id + " Team 2 Score:" + maxTeam2.run;
        }
    }
};
var refresh = function () {
    window.location.reload();
};
