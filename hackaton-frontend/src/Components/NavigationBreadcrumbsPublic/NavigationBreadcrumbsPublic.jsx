import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
import {HomeOutlined, AssignmentOutlined } from "@material-ui/icons";
import "./NavigationBreadcrumbsPublic.scss";
import HackathonLogo from "../../Images/Logo.png";

const NavigationBreadcrumbsPublic = () => {
    const currentPage = window.location.pathname;
    return (
        <div className="Navigation-Breadcrumbs-Wrapper">
            <div style={{ marginLeft: 5, marginBottom: 5, marginTop: 5 }}>
                <img style={{ width: 50, height: 50 }} src={HackathonLogo} alt="QLoto" />
            </div>
            <Breadcrumbs separator={<div className={"Separator"}>||</div>} className="Breadcrumbs">
                <Link
                    href="/"
                    className={currentPage === "/hackatons" ? "LinkBold" : "Link"}
                >
                    <HomeOutlined className="Icon" fontSize="small" />
                    Home
                </Link>
                <Link
                    href="/register"
                    className={currentPage === "/teams" ? "LinkBold" : "Link"}
                >
                    <AssignmentOutlined className="Icon" fontSize="small" />
                    Register
                </Link>
            </Breadcrumbs>
        </div>
    );
};

export default NavigationBreadcrumbsPublic;
