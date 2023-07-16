import React from "react";
import { useState, useMemo, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import BuildIcon from "@mui/icons-material/Build";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TagIcon from "@mui/icons-material/Tag";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

import ReactMarkdown from 'react-markdown'


import SupportIcon from "@mui/icons-material/Support";
import Badge from "@mui/material/Badge";

import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";

import useProfileApi from "../../hooks/use-profile-api";
import ProjectProgress from "../ProjectProgress/ProjectProgress";

import Box from "@mui/material/Box";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";

import NotesIcon from '@mui/icons-material/Notes'; 
import EventIcon from "@mui/icons-material/Event";
import CodeIcon from "@mui/icons-material/Code";

import useMediaQuery from '@mui/material/useMediaQuery';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from "next/link";


import useTeams from "../../hooks/use-teams";
import Events from "../Events/Events";
import {
  AccordionButton,
  AccordionContainer,
  AccordionTitle,  
  ProjectCard,
  ProjectDescText,
  ShortDescText,
  TitleStyled,
  YearStyled,
} from "./styles";
import Grid from '@mui/material/Grid';


import SkillSet from "../skill-set";
import CopyToClipboardButton from "../buttons/CopyToClipboardButton";
import ReactPixel from 'react-facebook-pixel';

import * as ga from '../../lib/ga';

export default function ProblemStatement({ problem_statement, user, npo_id }) {
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  const [open, setOpen] = useState(false);
  const [openUnhelp, setOpenUnhelp] = useState(false);
  const [help_checked, setHelpedChecked] = useState("");
  const [helpingType, setHelpingType] = useState("");

  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [createdTeamDetails, setCreatedTeamDetails] = useState();

  const { handle_new_team_submission, handle_join_team, handle_unjoin_a_team } =
    useTeams();

  const [newTeamSlackChannel, setNewTeamSlackChannel] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamEventId, setNewTeamEventId] = useState("");
  const [newTeamProblemStatementId, setNewTeamProblemStatementId] =
    useState("");

  const { handle_help_toggle } = useProfileApi();

  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  const advancedMatching = null; // { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
  ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, advancedMatching, options);

  // console.log("USER:",user);



  const [expanded, setExpanded] = useState("");
  const handleChange = (panel) => (event, isExpanded) => {
    // Set user object and handle null
    const user_id = user ? user.sub : null;
    const params = {
      action_name: isExpanded ? "open" : "close",
      panel_id: panel,
      npo_id: npo_id,
      problem_statement_id: problem_statement.id,
      problem_statement_title: problem_statement.title,
      user_id: user_id
    }    
    ReactPixel.trackCustom("problem_statement_accordion", params);
    ga.event({
      action: "problem_statement_accordion",
      params: params
    })
    setExpanded(isExpanded ? panel : false);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.375 17.542v-3.584h1.583v3.584Zm3.458 0v-9.25q-1.021.52-1.739 1.385-.719.865-.782 2.198H4.229q.063-1.937 1.427-3.448 1.365-1.51 3.302-1.51H10.5q1.708 0 2.938-1 1.229-1 1.27-2.667h1.084q-.021 1.729-1.052 2.927-1.032 1.198-2.573 1.615v9.75h-1.084v-4.959H8.917v4.959ZM10 5.396q-.688 0-1.156-.469-.469-.469-.469-1.156 0-.667.479-1.136.479-.468 1.146-.468.688 0 1.156.468.469.469.469 1.157 0 .666-.479 1.135T10 5.396Z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#00BB00",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#000",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="m4.646 15.646-1.688-1.708L6.917 10 2.958 6.062l1.688-1.708L10.292 10Zm6.75 0-1.688-1.708L13.688 10l-3.98-3.938 1.688-1.708L17.042 10Z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#FFFF00",
      borderRadius: 20 / 2,
    },
  }));

  const handleClickOpen = (event) => {
    if (event.target.checked) {
      // Only when selecting yes
      setOpen(true);
      ReactPixel.track("Helping Dialog Opened", {
        problem_statement_id: problem_statement.id,
        problem_statement_title: problem_statement.title,
        npo_id: npo_id,
        user_id: user.sub
        });
    } else {
      setOpenUnhelp(true);

      ReactPixel.track("Not Helping Dialog Opened", {
        problem_statement_id: problem_statement.id,
        problem_statement_title: problem_statement.title,
        npo_id: npo_id,
        user_id: user.sub
        });
    }
  };

  const handleLeavingTeam = (teamId) => {
    handle_unjoin_a_team(teamId, handleTeamLeavingResponse);

    ReactPixel.track("Team Left", {
      team_id: teamId
      });

    ga.event({
      action: "team_left",
      params: {
        team_id: teamId
      }
    });

  };

  const handleJoiningTeam = (teamId) => {
    handle_join_team(teamId, handleTeamLeavingResponse);

    ReactPixel.track("Team Joined", {
      team_id: teamId
      });
    
    ga.event({
      action: "team_joined",
      params: {
        team_id: teamId
      }
    });

  };

  const handleTeamCreate = (problemStatementId, eventId) => {
    setNewTeamProblemStatementId(problemStatementId);
    setNewTeamEventId(eventId);
    setCreateTeamOpen(true); // Open the modal

    ReactPixel.track("Team Create Dialog Opened", {
      problem_statement_id: problemStatementId,
      event_id: eventId
      });

    ga.event({
      action: "team_create_dialog_opened",
      params: {
        problem_statement_id: problemStatementId,
        event_id: eventId
      }
    });

  };

  const handleUpdateTeamName = (event) => {
    const value = event.target.value;
    setNewTeamName(value);

    ReactPixel.track("Team Name Updated", {
      team_name: value
      });

    ga.event({
      action: "team_name_updated",
      params: {
        team_name: value
      }
    });

  };

  const handleUpdateSlackChannel = (event) => {
    const value = event.target.value;
    setNewTeamSlackChannel(value);

    ReactPixel.track("Slack Channel Entered", {
      slack_channel: value
      });

    ga.event({
      action: "slack_channel_entered",
      params: {
        slack_channel: value
      }
    });

  };

  const handleConfirmTeamCreate = (event) => {
    // Submit button pressed to create team
    const params = {
      team_name: newTeamName,
      slack_channel: newTeamSlackChannel,
      problem_statement_id: newTeamProblemStatementId,
      event_id: newTeamEventId,
      user_id: user.sub
    }
    ReactPixel.trackCustom("team_create", params);
    ga.event({
      action: "team_create",
      params: params
    })


    handle_new_team_submission(
      newTeamName,
      newTeamSlackChannel,
      newTeamProblemStatementId,
      newTeamEventId,
      user.sub,
      handleTeamCreationResponse
    );
    setCreateTeamOpen(false); // Submit button pressed to create team
  };

  const handleTeamLeavingResponse = (data) => {
    // Person left a team
    ReactPixel.track("Team Left");
    ga.event({
      category: "Team",
      action: "Team Left",
      label: "Team",
    });


    // console.log(data);
    // We don't do anything when someone leaves
  };

  const handleTeamCreationResponse = (data) => {
    // We need to update our state to temporarily show the user that they have created a team
    // This should be followed up on refresh of the page with a hit to grab the real version from the backend/DB
    setCreatedTeamDetails({
      name: data.team.name,
      slack_channel: data.team.slack_channel,
      active: "True",
      users: [
        {
          name: data.user.name,
          profile_image: data.user.profile_image,
        },
      ],
    });
  };

  const handleCloseTeamCreate = (event) => {
    setCreateTeamOpen(false); // Cancel or close selected
    ReactPixel.track("Team Creation Dialog Closed", {
      user_id: user.sub
    });
    ga.event({
      category: "Team Creation",
      action: "Team Creation Dialog Closed",
      label: "Team Creation",
    });

  };

  const handleClose = (event) => {
    // They wanted to start helping
    ReactPixel.track("Helping: User Finalized Start Helping", {
      problem_statement_id: problem_statement.id,
      problem_statement_title: problem_statement.title,
      npo_id: npo_id,
      user_id: user.sub,
      mentor_or_hacker: event.target.value
      });
    ga.event({
      category: "Helping",
      action: "User Finalized Helping",
      label: "Helping",
    });


    setOpen(false);
    setHelpedChecked("checked");
    setHelpingType(event.target.value);
    // event.target.value will be either "mentor" or "hacker"
    handle_help_toggle(
      "helping",
      problem_statement.id,
      event.target.value,
      npo_id
    );
  };

  const handleCancel = (event) => {
    // They didn't want to start helping (cancel button pressed)
    ReactPixel.track("Helping: User Canceled Helping", {
      problem_statement_id: problem_statement.id,
      problem_statement_title: problem_statement.title,
      npo_id: npo_id,
      user_id: user.sub
      });
    ga.event({
      category: "Helping",
      action: "User Canceled Helping",
      label: "Helping",
    });

    setOpen(false);
    setHelpedChecked("");
    setHelpingType("");
  };

  const handleCloseUnhelp = (event) => {
    // They wanted to stop helping
    ReactPixel.track("Helping: User Finalized Stop Helping", {
      problem_statement_id: problem_statement.id,
      problem_statement_title: problem_statement.title,
      npo_id: npo_id,
      user_id: user.sub
    });
    ga.event({
      category: "Helping",
      action: "User Finalized Stop Helping",
      label: "Helping",
    });

    setOpenUnhelp(false);
    setHelpedChecked("");
    setHelpingType("");
    handle_help_toggle("not_helping", problem_statement.id, "", npo_id);
  };

  const handleCloseUnhelpCancel = (event) => {
    // They didn't want to stop helping (cancel button pressed)
    ReactPixel.track("Helping: User Canceled Stop Helping");
    ga.event({
      category: "Helping",
      action: "User Canceled Stop Helping",
      label: "Helping",
    });

    setOpenUnhelp(false);
  };

  function getWordStr(str) {
    if( str != null && str.length > 0 && typeof str === "string" )
    {
      return str.split(/\s+/).slice(0, 30).join(" ");
    }
    else {
      return "";
    }
    
  }

  var TeamText = "";
  if (problem_statement.events != null) {
    var teamCounter = 0;
    problem_statement.events.forEach((event) => {
      event.teams.forEach((ateam) => {
        if (ateam.problem_statements != null && 
            ateam.problem_statements.includes(problem_statement.id)) {
          teamCounter++;
        }
      });
    });
    var s = teamCounter === 1 ? "" : "s";
    var is_are = teamCounter === 1 ? " is " : " are ";
    TeamText =
      "There" + is_are + teamCounter + " team" + s + " working on this";
  }

  var status = "";  
  var cardBackground = "#f5f7f77f";

  if (problem_statement.status === "production") {
    status = (
      <Tooltip
        enterTouchDelay={0}
        title={
          <span style={{ fontSize: "14px" }}>We pushed this to production!</span>
        }
        arrow
      >
      <Chip variant="outlined" icon={<WorkspacePremiumIcon />} color="success" label="Live" />      
      </Tooltip>
    );
    cardBackground = "#e5fbe5";

    
  } else {
    status = <Tooltip
      enterTouchDelay={0}
      title={
        <span style={{ fontSize: "14px" }}>This project isn't complete yet, and we need your help!</span>
      }
      arrow
    >
    <Chip icon={<BuildIcon />} color="warning" label="Needs Help" />
    </Tooltip>
  }

  var callToAction = "";
  var helpingSwitch = "";
  var helpingSwitchType = "";

  var countOfHackers = 0;
  var countOfMentors = 0;
  if (problem_statement.helping != null && problem_statement.helping.length > 0) {
    problem_statement.helping.forEach((help) => {
      if (help.type === "mentor") {
        countOfMentors++;
      } else if (help.type === "hacker") {
        countOfHackers++;
      }
    });
  }

  // Read the DB details passed into this component and update the state accordingly
  useMemo(() => {
    if (problem_statement.helping != null && user != null && problem_statement.helping.length > 0) {
      problem_statement.helping.forEach((help) => {
        if (help.slack_user === user.sub) {
          setHelpedChecked("checked");
          setHelpingType(help.type);
        }
      });
    }
  }, [problem_statement, user]);

  if (user == null) {     
    // helpingSwitch should set a FormControlLabel and helpingSwitch should show everyting disabled
    helpingSwitch = (
      <FormControlLabel
        labelPlacement="bottom"
        control={<MaterialUISwitch sx={{ m: 1, color: "gray"}} disabled />}
        label="Login to help"
      />
    );

    callToAction = (
      <Link href={`/signup?previousPage=/nonprofit/${npo_id}`}>    
        <button className="button button--compact button--primary">
          Login first
        </button>
      </Link>
    );
  

  } else {
    callToAction = (
      <a
        href={`https://opportunity-hack.slack.com/app_redirect?channel=${problem_statement.slack_channel}`}
        target="_blank"
        rel="noreferrer"
      >
        <button className="button button--compact button--primary">
          Join <TagIcon />
          {problem_statement.slack_channel} to help
        </button>
      </a>
    );
    if (helpingType === "hacker") {
      helpingSwitchType = (
        <div>
          <DeveloperModeIcon />
          I'm helping as a hacker
        </div>
      );
    } else if (helpingType === "mentor") {
      helpingSwitchType = (
        <div>
          <SupportIcon /> I'm helping as a mentor
        </div>
      );
    } else {
      helpingSwitchType = <span>Slide to help</span>;
    }

    helpingSwitch = (
      <FormControlLabel
        onClick={handleClickOpen}
        onChange={handleClickOpen}
        labelPlacement="bottom"        
        control={<MaterialUISwitch sx={{ m: 1 }} checked={help_checked} />}
        label={helpingSwitchType}
      />
    );
  }

  var reference_count = 0;
  var references_buttons = "";
  if (
    problem_statement.references != null &&
    problem_statement.references.length > 0
  ) {
    reference_count = problem_statement.references.length;
    references_buttons = problem_statement.references.map((reference) => {
      return (
        <a target="_blank" rel="noopener noreferrer" href={reference.link}>
          <Button
            key={reference.name}
            className="button button--pad button--third"
          >
            <ArticleIcon />
            &nbsp;
            {reference.name}
          </Button>
        </a>
      );
    });
  } else {
    references_buttons = <p>No references yet</p>;
  }

  var mentorsAddPlural = [];
  var hackersAddPlural = [];

  if (countOfHackers === 0 || countOfHackers > 1) {
    hackersAddPlural[0] = "s";
    hackersAddPlural[1] = "are";
  } else {
    hackersAddPlural[0] = "";
    hackersAddPlural[1] = "is";
  }

  if (countOfMentors === 0 || countOfMentors > 1) {
    mentorsAddPlural[0] = "s";
    mentorsAddPlural[1] = "are";
  } else {
    mentorsAddPlural[0] = "";
    mentorsAddPlural[1] = "is";
  }

  const copyProjectLink = "project/"+problem_statement.id;

  const myItems = [
    {
      label: 'Description',
      icon: <NotesIcon />,
      description: <Typography fontSize={13}>
        {getWordStr(problem_statement.description)}...
      </Typography>,
      content: 
        <ProjectDescText>
          <ReactMarkdown>
          {problem_statement.description}
          </ReactMarkdown>
        </ProjectDescText>        
    },
    {
      label: 'Events',
      icon: <EventIcon />,      
      description: <Stack>
        <ShortDescText>
          {problem_statement.events.length > 0
            ? `We've hacked on this at ${problem_statement.events.length
            } event${problem_statement.events.length > 1 ? "s" : ""}`
            : "We haven't hacked on this project yet!"}
        </ShortDescText>
        <ShortDescText>{TeamText}</ShortDescText>
      </Stack>,
      content: 
      <ProjectDescText>
        <Events
          events={problem_statement.events}
          onTeamCreate={handleTeamCreate}
          onTeamLeave={handleLeavingTeam}
          onTeamCreateComplete={createdTeamDetails}
          onTeamJoin={handleJoiningTeam}
          user={user}
          problemStatementId={problem_statement.id}
          isHelping={help_checked}
        />
      </ProjectDescText>      
    },
    {
      label: 'Code & Tasks',
      icon: <CodeIcon />,
      description: "GitHub repos and Tasks associated with this project",

      content: 
      <ProjectDescText>
      <Grid container direction="row" spacing={0.5} padding={0}>
        <Stack spacing={1} padding={0.5}>
        {
          problem_statement.github != null &&
          problem_statement.github.length > 0 &&
          typeof problem_statement.github !== "string" ? (
          problem_statement.github.map((github) => (
            <AccordionButton
              target="_blank"
              rel="noopener noreferrer"
              key={github.name}
              href={github.link}
              className="button button--primary button--compact"
            >
              {github.name}
            </AccordionButton>
          ))
        ) : (
          <p>No GitHub links yet.</p>
        )}
          </Stack>

        <Stack spacing={1} padding={0.5}>
        {problem_statement.github != null &&
          problem_statement.github.length > 0 &&
          typeof problem_statement.github !== "string" &&
          problem_statement.github.map((github) => (
            <AccordionButton
              target="_blank"
              rel="noopener noreferrer"
              key={github.name}
              className="button button--primary button--compact"
              href={`${github.link}/issues`}
            >
              Tasks for {github.name}
            </AccordionButton>
          ))}
          </Stack>
        </Grid>   
        </ProjectDescText>   
    },
    {
      label: 'References',
      icon: <ArticleIcon />,
      description: <ShortDescText>
        {reference_count} doc{
          // handle plural vs singular
          (reference_count === 0 || reference_count > 1) ? "s" : ""
          // handle zero records 
        } that will help you better understand the problem
      </ShortDescText>,
      content: <ProjectDescText>{references_buttons}</ProjectDescText>
    },    
  ];

  // Accordion for large screens
  const myAccordion = myItems.map((item) => (
    <Accordion
      expanded={expanded === item.label}
      onChange={handleChange(item.label)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={item.label + "bh-content"}
        id={item.label + "bh-header"}
      >
        <AccordionTitle>
          {item.icon}
          {item.label}  
        </AccordionTitle>
        {item.description}
      </AccordionSummary>            
          {item.content}                    
    </Accordion>
  ));

  // Tabs for small screens
  const myTabs = myItems.map((item) => (
    <Tab onClick={handleChange(item.label)} sx={{ width: "50px" }} icon={item.icon} label={item.label} value={item.label} />
  ));

  const myTabPanel = myItems.map((item) => (
    <TabPanel sx={{ width: "100%" }} value={item.label}>                    
      {item.content}         
    </TabPanel>
  ));

  const [tabValue, setTabValue] = React.useState('Description');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // console.log("== Problem Statement Render: ", problem_statement);

  return (
    <ProjectCard container bgcolor={cardBackground} sx={{ border: 1, borderColor: "#C0C0C0" }} key={problem_statement.id}>
      <Grid container item xs={6} md={6} justifyItems="flex-start">        
        {status}
      </Grid>
      <Grid container item xs={6} md={6} justifyContent="flex-end" justifyItems="flex-end">
        <CopyToClipboardButton location={copyProjectLink} />                
      </Grid>
      <Grid container item xs={12} md={12} justifyContent="flex-start">
        <Stack direction="row" spacing={0} justifyContent="flex-end">
          
          <SkillSet Skills={problem_statement.skills} />          
        </Stack>
      </Grid>
            
      <Grid container item xs={12} md={12} justifyItems="flex-end" justifyContent="flex-end">
        <Tooltip
         enterTouchDelay={0}
          title={
            <span
              style={{ fontSize: "14px" }}
            >{`${countOfHackers} hacker${hackersAddPlural[0]} ${hackersAddPlural[1]} hacking`}</span>
          }
          style={{ marginLeft: "2rem" }}
        >
          <Badge
            showZero
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={countOfHackers}
            color="secondary"
          >
            <DeveloperModeIcon fontSize="large" />
          </Badge>
        </Tooltip>

        <Tooltip
          enterTouchDelay={0}
          title={
            <span
              style={{ fontSize: "14px" }}
            >{`${countOfMentors} mentor${mentorsAddPlural[0]} ${mentorsAddPlural[1]} mentoring`}</span>
          }
          style={{ marginLeft: "2rem" }}
        >
          <Badge
            showZero
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={countOfMentors}
            color="secondary"
          >
            <SupportIcon fontSize="large" />
          </Badge>
        </Tooltip>       
      </Grid>
      
    <TitleStyled sx={{marginBottom: "5px"}} variant="h2">{problem_statement.title}</TitleStyled>            
    <YearStyled>{problem_statement.first_thought_of}</YearStyled>      
    <ProjectProgress state={problem_statement.status} />      

    { 
      isLargeScreen ? 
      <AccordionContainer>
        {myAccordion}
      </AccordionContainer> 
      : 
      <TabContext allowScrollButtonsMobile scrollButtons={true}  value={tabValue}>          
        <TabList allowScrollButtonsMobile scrollButtons={true} onChange={handleTabChange} aria-label="lab API tabs example">              
          {myTabs}                          
        </TabList>
        {myTabPanel}  
      </TabContext>    
    }


    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Thank you for helping a nonprofit with your talent!
      </DialogTitle>
      <DialogContent>
        <DialogContentText component={"span"} id="alert-dialog-description">
          There are several ways to contibute, if you want, when you want.
          <h4>Hacker</h4>
          You'll be creating something that benefits nonprofits. Most of what
          you do will take place on:
          <ul>
            <li>
              <b>Slack</b> - communication with your team, non-profits,
              mentors
            </li>
            <li>
              <b>DevPost</b> - for hackathons this is the main landing place
              for your project
            </li>
            <li>
              <b>GitHub</b> - your code must be publically available and well
              documented so that others can use it
            </li>
            <li>
              <b>Heroku</b> - when you productionalize your code, use Heroku
              as one of the easiest ways to make it available to the masses
            </li>
          </ul>
          <h4>Mentor</h4>
          You'll be assisting hackers with their project. Most of what you do
          will take place on:
          <ul>
            <li>
              Slack - checking in on teams and jumping into a screenshare here
              and there
            </li>
          </ul>
          Your goals are:
          <ul>
            <li>Make sure the team knows the problem they are solving</li>
            <li>...are solving that problem 👆</li>
            <li>
              Are using libraries and are not trying to reinvent the wheel
            </li>
            <li>Are looking at the judging criteria (on DevPost)</li>
            <li>
              Have a demo video that is 4 minutes that describes the problem
              and solution using tools like Loom or Quicktime.
            </li>
          </ul>
          <a
            href="https://www.ohack.org/about/mentors"
            rel="noreferrer"
            target="_blank"
          >
            More details on mentoring
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          class="button button--compact button--third"
          onClick={handleClose}
          value="hacker"
          autoFocus
        >
          Help as Hacker
        </Button>
        <Button
          class="button button--compact button--third"
          onClick={handleClose}
          value="mentor"
        >
          Help as Mentor
        </Button>
        <Button
          class="button button--compact button--secondary"
          className="error"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={openUnhelp}
      onClose={handleCloseUnhelp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Helping has completed!
      </DialogTitle>
      <DialogContent>
        <DialogContentText component={"span"} id="alert-dialog-description">
          <h4>What this means</h4>
          You are recording the fact that you're no longer helping this
          nonprofit
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          class="button button--compact button--secondary"
          onClick={handleCloseUnhelpCancel}
        >
          Cancel
        </Button>
        <Button
          class="button button--compact button--red"
          onClick={handleCloseUnhelp}
          autoFocus
        >
          Withdrawl Help
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={createTeamOpen}
      onClose={handleCloseTeamCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create a new team</DialogTitle>
      <DialogContent>
        <DialogContentText component={"span"} id="alert-dialog-description">
          <Stack spacing={2}>
            <TextField
              id="team-name"
              label="Team Name"
              helperText="Any unique name you can use to identify your team"
              onChange={handleUpdateTeamName}
              margin="dense"
              FormHelperTextProps={{ style: { fontSize: 12 } }} // font size of helper label
              variant="filled"
            />

            <TextField
              id="slack-name"
              label="Slack Channel Name"
              helperText="Create this public channel first"
              onChange={handleUpdateSlackChannel}
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
              FormHelperTextProps={{ style: { fontSize: 12 } }} // font size of helper label
              variant="filled"
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          class="button button--compact button--secondary"
          onClick={handleCloseTeamCreate}
        >
          Cancel
        </Button>
        <Button
          class="button button--compact button--third"
          onClick={handleConfirmTeamCreate}
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>

    <Stack spacing={2} direction="row">
        {helpingSwitch}
      <Box sx={{ width: "75%" }}>{callToAction}</Box>      
    </Stack>
  </ProjectCard>
  );
}
