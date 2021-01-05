import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
import { PeopleRounded, GroupWorkOutlined, AccountCircleRounded, MemoryOutlined } from "@material-ui/icons";
import "./NavigationBreadcrumbsAdmin.scss";
import HackathonLogo from "../../Images/Logo.png";

const NavigationBreadcrumbsAdmin = () => {
    const currentPage = window.location.pathname;
    return (
        <div className="Navigation-Breadcrumbs-Wrapper">
            <div style={{ marginLeft: 5, marginBottom: 5, marginTop: 5 }}>
                <img style={{ width: 50, height: 50 }} src={HackathonLogo} alt="QLoto" />
            </div>
            <Breadcrumbs separator={<div className={"Separator"}>||</div>} className="Breadcrumbs">
                <Link
                    href="/hackatons"
                    className={currentPage === "/hackatons" ? "LinkBold" : "Link"}
                >
                    <MemoryOutlined className="Icon" fontSize="small" />
                    Hackatons
                </Link>
                <Link
                    href="/teams"
                    className={currentPage === "/teams" ? "LinkBold" : "Link"}
                >
                    <GroupWorkOutlined className="Icon" fontSize="small" />
                    Teams
                </Link>
                <Link
                    href="/users"
                    className={currentPage === "/users" ? "LinkBold" : "Link"}
                >
                    <PeopleRounded className="Icon" fontSize="small" />
                    Users
                </Link>
                <Link
                    href="/credentials"
                    className={currentPage === "/credentials" ? "LinkBold" : "Link"}
                >
                    <AccountCircleRounded className="Icon" fontSize="small" />
                    Credentials
                </Link>
            </Breadcrumbs>
            <div style={{ marginTop: 5, marginRight: 5 }}>
                {window.localStorage.getItem("name")}
                <br />
                <a style={{ color: "#DAA1A0" }} onClick={() => window.localStorage.clear()} href="/">Log Out</a>
            </div>
        </div>
    );
};

export default NavigationBreadcrumbsAdmin;
