import { useState, createContext } from "react";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import NewElection from "./NewElection";
import MainSec from "./MainSec";
import Ballot from "./Ballot";
import logo from "/assets/logo.svg";
import user from "/assets/user.svg";
import Login from "./Login";
import SignUp from "./SignUp";
import NewPosition from "./NewPosition";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Voters from "./Voters";
import "./App.css";
import NewParty from "./NewParty";
import Voting from "./Voting";

export const ElectionContext = createContext({
  elections: [],
  electionData: {},
  setElectionData: () => {},
  handleElectionData: () => {},
  handleAddElection: () => {},
});

export const UserContext = createContext({
  userState: {},
  userInfo: {},
  currentUserEmail: "",
  setCurrentuserEmail: () => {},
  setUserState: () => {},
  handleUserData: () => {},
  handleSignUpStatusChange: () => {},
  handleLoginStatusChange: () => {},
});

export const ChoicesContext = createContext({
  positions: {},
  choicesList: [],
  choiceInfo: { choices: "", party: "" },
  position: "",
  selectedPosition: "",
  selectedChoices: [],
  setSelectedPosition: () => {},
  setSelectedChoices: () => {},
  setPosition: () => {},
  handleChoiceInfo: () => {},
  handleAddChoice: () => {},
});

function App() {
  const [elections, setElections] = useState([]);
  const [electionData, setElectionData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    selectedTimezone: "",
  });

  const handleAddElection = (newElectionData) => {
    setElections([...elections, { ...newElectionData, id: Date.now() }]);
  };

  const [positions, setPositions] = useState("");
  const [position, setPosition] = useState("");
  const [choiceInfo, setChoiceInfo] = useState({
    choices: "",
    party: "",
  });

  const [choicesList, setChoicesList] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedChoices, setSelectedChoices] = useState([]);

  const handleChoiceInfo = (event) => {
    if (event.target.name === "position") {
      setPosition(event.target.value);
    }
    setChoiceInfo({
      ...choiceInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddChoice = () => {
    if (
      position === "" ||
      choiceInfo.choices === "" ||
      choiceInfo.party === ""
    ) {
      return;
    }

    const newChoice = { choice: choiceInfo.choices, party: choiceInfo.party };
    setPositions((prevPositions) => ({
      ...prevPositions,
      [position]: [...(prevPositions[position] || []), newChoice],
    }));
    setChoiceInfo({ choices: "", party: "" });
  };

  const handleElectionData = (event) => {
    setElectionData({
      ...electionData,
      [event.target.name]: event.target.value,
    });
  };

  const [userState, setUserState] = useState({
    signUpStatus: "ADMIN SIGNUP",
    identity: "Admin ID",
    loginStatus: "ADMIN LOGIN",
  });

  const handleSignUpStatusChange = (newSignUpStatus) => {
    const newIdentity =
      newSignUpStatus === "ADMIN SIGNUP" ? "Admin ID" : "Reg.no";
    setUserState({
      signUpStatus: newSignUpStatus,
      identity: newIdentity,
    });
  };

  const handleLoginStatusChange = (newLoginStatus) => {
    const newIdentity =
      newLoginStatus === "ADMIN LOGIN" ? "Admin ID" : "Reg.no";
    setUserState({
      loginStatus: newLoginStatus,
      identity: newIdentity,
    });
  };

  const [currentUserEmail, setCurrentuserEmail] = useState("");
  console.log(currentUserEmail);

  return (
    <>
      <ElectionContext.Provider
        value={{
          elections,
          setElections,
          electionData,
          setElectionData,
          handleElectionData,
          handleAddElection,
        }}
      >
        <UserContext.Provider
          value={{
            userState,
            currentUserEmail,
            setCurrentuserEmail,
            setUserState,
            handleSignUpStatusChange,
            handleLoginStatusChange,
          }}
        >
          <ChoicesContext.Provider
            value={{
              positions,
              choicesList,
              choiceInfo,
              position,
              selectedPosition,
              selectedChoices,
              setPosition,
              handleChoiceInfo,
              handleAddChoice,
              setSelectedPosition,
              setSelectedChoices,
            }}
          >
            <nav className="nav routeNav">
              <img src={logo} alt="logo" className="logo" />
              <div className="links">
                <div className="genLinks">
                  <NavLink to="/" className="link">
                    Home
                  </NavLink>

                  <NavLink to="/news" className="link">
                    News
                  </NavLink>

                  <NavLink to="/campaigns" className="link">
                    Campaigns
                  </NavLink>
                </div>

                {currentUserEmail ? (
                 
                    <NavLink to="profile" key="profile" >
                      <div className="user">
                        <img src={user} alt="user" className="icon" />
                        <p>{currentUserEmail}</p>
                      </div>
                    </NavLink>
                 
                ) : (
                  <div className="regLinks">
                    <NavLink to="/login" className="link">
                      Login
                    </NavLink>
                    <NavLink to="/Signup" className="link">
                      Signup
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/newPosition" element={<NewPosition />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/newElection" element={<NewElection />} />

              <Route path="/main">
                <Route index element={<MainSec />} />
                <Route path="overview" element={<MainSec />} />
                <Route path="ballot" element={<Ballot />} />
                <Route path="voters" element={<Voters />} />
              </Route>
              <Route path="/ballot" element={<Ballot />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup">
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/newElection">
                <Route path="main" element={<MainSec />} />
              </Route>

              <Route path="/newPosition" element={<NewPosition />} />
              <Route path="/Voters" element={<Voters />} />
              <Route path="/NewParty" element={<NewParty />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/voting/:position" element={<Voting />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ChoicesContext.Provider>
        </UserContext.Provider>
      </ElectionContext.Provider>
    </>
  );
}

export default App;
