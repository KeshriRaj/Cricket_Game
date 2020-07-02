interface over_runs {
    [index: number]: Number;
}
interface Team_Details {
    player: over_runs;
    total_run: Number;
}
class Team {
    TeamList;
    i = 0;
    j = 0;
    start=false;
    stop=false;
    check_play=false;
    Team_total = 0;
    once=true;
    top_scorer={run:0,Player_Id:"",total:0};
    team_name;
    constructor(TeamList: Team_Details[],team_name:string) {
        this.TeamList = TeamList;
        this.team_name=team_name;
    }



    start_playing = () => {
        this.check_play=true;
        setTimeout(() => {
            console.log(3)
            setTimeout(() => {
                console.log(2)
                setTimeout(() => {
                    console.log(1);
                    setTimeout(() => {
                        this.start=true;
                        this.stop=true;
                        console.log("Match started");
                         let seconds=60;
                         console.log("outer",seconds);
                            let x = () => {
                            if (!(this.start) || seconds < 0)
                            {
                            document.getElementById("timer").innerHTML = "";
                            return;
                            }
                                console.log(seconds);
                                document.getElementById("timer").innerHTML = seconds.toString() + "s";
                                setTimeout(function () {
                                 seconds--;
                                 x();
                             }, 1000);
                         }
                         x();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
        setTimeout(() => {
            this.start=false;
        }, 60000);
    };




    get_runs = () => {
        let table_val=<HTMLTableElement>document.getElementById(this.team_name);
        let col=7;
        if (this.i < 10 && this.start) {
            let runs = Math.floor(Math.random() * (7 - 0));
            this.TeamList[this.i].player.push(runs);
            table_val.rows[this.i+1].cells[Number(this.j)+1].innerHTML=runs.toString();
            console.log("Player ", this.i + 1, " Ball ", this.j + 1, " = ", this.TeamList[this.i].player[this.j], "Runs");

            if (this.j == 5 || this.TeamList[this.i].player[this.j] == 0) {
                
                console.log(" Total Runs = ",this.TeamList[this.i].total_run);
                this.TeamList[this.i].total_run+=this.TeamList[this.i].player[this.j];
                table_val.rows[this.i+1].cells[col].innerHTML=(this.TeamList[this.i].total_run).toString();
                if(this.top_scorer.run<this.TeamList[this.i].total_run)
                {
                this.top_scorer.run=Math.max(this.top_scorer.run,this.TeamList[this.i].total_run);
                this.top_scorer.Player_Id="Player ".concat((this.i+1).toString());
                }
                this.i++;
                this.j = 0;
            }
            else {
                this.Team_total+=this.TeamList[this.i].player[this.j];
                this.TeamList[this.i].total_run+=this.TeamList[this.i].player[this.j];
                console.log("  Total Runs = ",this.TeamList[this.i].total_run);
                this.j++;
            }
        }
        else{
            if(!this.stop && !this.start)
            {
                if(this.check_play)
                alert("Match will start in 3 seconds ........");
                else
                alert("Please press the PLAY TEAM1 or PLAY TEAM2");
            }
            else
            {
            this.start=false;
            alert("Cannot Hit as Match is Over");
            }
        }
        this.team_total();

    }


    display_runs = () => {
        this.TeamList.forEach(element => {
            element.player.forEach(element2 => {
                console.log(element2);
            });

        });
    }

    team_total=()=>{

        if(this.team_name=="team1")
        document.getElementById("score1").innerHTML = this.Team_total.toString();
        else if(this.team_name=="team2")
        document.getElementById("score2").innerHTML = this.Team_total.toString();
        console.log(this.Team_total);
        this.top_scorer.total=this.Team_total
        console.log(this.top_scorer)

    }




}

let Team1 = new Team([{ player: [], total_run: 0 },
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

],"team1")

let Team2 = new Team([{ player: [], total_run: 0 },
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
    
    ],"team2")

let team1_total=Team1.top_scorer;
let team2_total=Team2.top_scorer;

let maxTeam1=Team1.top_scorer;
let maxTeam2=Team2.top_scorer;


let query=-1;
var generate_result=()=>{
    
   let px=true;
    console.log(team2_total.total);
    if(Number(team1_total.total)>Number(team2_total.total)&&team1_total.total!=0 && team2_total.total!=0)
    {
    document.getElementById("won").innerHTML="MATCH WON BY TEAM1 ";
    query=1;
    }
    else if(Number(team1_total.total)<Number(team2_total.total)&&team1_total.total!=0 && team2_total.total!=0)
    {
    document.getElementById("won").innerHTML="MATCH WON BY TEAM2 ";
    query=2;
    }
    else if(Number(team1_total.total)==Number(team2_total.total)&&team1_total.total!=0)
    document.getElementById("won").innerHTML="MATCH DRAW ";
    else
    {
    document.getElementById("won").innerHTML="BOTH TEAM HAS NOT PLAYED ";
    px=false;
    }

    if(!px)
    document.getElementById("mom").innerHTML="";
    else
    {
    if(Number(maxTeam1.run)>Number(maxTeam2.run))
    {
        document.getElementById("mom").innerHTML="Man of the Match :"
                                                  + maxTeam1.Player_Id +
                                                " Team 1 Score:"
                                                + maxTeam1.run;
    }
    else if (Number(maxTeam1.run)<Number(maxTeam2.run))
    {
        document.getElementById("mom").innerHTML="Man of the Match : "+ maxTeam2.Player_Id+ " Team 2 Score:"+ maxTeam2.run;
    }
    else{
        if(query==1)
        document.getElementById("mom").innerHTML="Man of the Match : "+ maxTeam1.Player_Id+ " Team 1 Score:"+maxTeam1.run;
        else if(query==2)
        document.getElementById("mom").innerHTML="Man of the Match : "+ maxTeam2.Player_Id+ " Team 2 Score:"+maxTeam2.run;
        else
        document.getElementById("mom").innerHTML="Man of the Match : "+ maxTeam1.Player_Id+ " Team 1 Score:"+maxTeam1.run+`</br>`+"Man of the Match : "+ maxTeam2.Player_Id+ " Team 2 Score:"+maxTeam2.run;
    }
}   

}
let refresh=()=>{
    window.location.reload();
}
