import { useEffect, useState } from "react";
import { getAllUsers, getUsers } from "../../../../Apis/users/userService";
import style from "./overview.module.css";
import { Link } from "react-router-dom";
import { getRecentLogin } from "../../../../Apis/event/eventService";
import Table from "../../components/table/table";
import { useAuth } from "../../../context/auth";
import { getAllTags, getTags } from "../../../../Apis/tags/tagsService";

function Overview() {
  const { user } = useAuth();
  const [usersNum, setUsersNum] = useState(null);
  const [totalTags, setTotalTags] = useState(null);
  const [logins, setLogins] = useState(null);
  const tableColumn = [
    { heading: "ID", value: "id" },
    { heading: "UserID", value: "userId" },
    { heading: "Login type", value: "event_type" },
    { heading: "Time", value: "createdAt" },
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayName = dayNames[dayOfWeek];

  const fetchData = async () => {
    try {
      const dataUsers = await getUsers(1, 2, "hhh", user?.token);
      const tag = await getAllTags(user?.token);
      setTotalTags(tag?.totalNoOfTags);
      const loggedInActivities = await getRecentLogin(user?.token);
      setLogins(loggedInActivities?.login_events);
      setUsersNum(dataUsers?.totalNoOfUsers);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  return (
    <div className={style.overviewWrapper}>
      <header className={style.overviewHeader}>
        <h1>OR-Stretch | Back Office</h1>
      </header>
      <main>
        <div className={style.overiewCards}>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i className="iconsminds-clock mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>Total Logins for Today</h1>
              <p>
                Total stretch time this <br /> month
              </p>
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i className="iconsminds-male mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>{usersNum && usersNum} Users</h1>
              <p>Total number of users</p>
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <ion-icon name="pricetag-outline"></ion-icon>
              <h1>{totalTags} Tags</h1>
              <p>Total number of tags</p>
            </div>
          </div>
        </div>
        <div className={style.tableWrapper}>
          <h1>Recent User Sign-Ins</h1>
          <Table column={tableColumn} data={logins} />
        </div>
      </main>
    </div>
  );
}

export default Overview;
