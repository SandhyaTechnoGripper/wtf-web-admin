/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">Dashboard</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*Classic submenu*/}
            {/*begin::1 Level*/}
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item  menu-item-rel ${getMenuItemActive('/google-material')}`}>
                <NavLink className="menu-link " to="/allusers">
                    <span className="menu-text">User Management</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                </li>
            {/*end::1 Level*/}

            {/*Mega submenu*/}
            {/*begin::1 Level*/}
            <li
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/google-material/inputs/text-fields')}`}
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
            >
                <NavLink className="menu-link " to="/gym">
                    <span className="menu-text">Gym Management</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div
                    className="menu-submenu menu-submenu-fixed menu-submenu-left"
                    style={{ width: "1000px" }}
                >
                    <div className="menu-subnav">
                        <ul className="menu-content">
                            <li className="menu-item ">
                                <h3 className="menu-heading menu-toggle">
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">A ... C</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/alert')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/alert">
                                            <span className="menu-text">Alerts</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/accordion')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/accordion">
                                            <span className="menu-text">Accordion</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/badge')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/badge">
                                            <span className="menu-text">Badge</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/breadcrumb')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/breadcrumb">
                                            <span className="menu-text">Breadcrumb</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/buttons')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/buttons">
                                            <span className="menu-text">Buttons</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/button-group')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/button-group">
                                            <span className="menu-text">Button Group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/cards')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/cards">
                                            <span className="menu-text">Cards</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <ul className="menu-inner">
                                    <h3 className="menu-heading menu-toggle">
                                        <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                        <span className="menu-text">C ... J</span>
                                        <i className="menu-arrow"></i>
                                    </h3>
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/carousel')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/carousel">
                                            <span className="menu-text">Carousel</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/dropdowns')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/dropdowns">
                                            <span className="menu-text">Dropdowns</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/forms')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/forms">
                                            <span className="menu-text">Forms</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/input-group')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/input-group">
                                            <span className="menu-text">Input Group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/images')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/images">
                                            <span className="menu-text">Images</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/figures')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/figures">
                                            <span className="menu-text">Figures</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/jumbotron')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/jumbotron">
                                            <span className="menu-text">Jumbotron</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <h3 className="menu-heading menu-toggle">
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">L ... P</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/list-group')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/list-group">
                                            <span className="menu-text">List group</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/modal')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/modal">
                                            <span className="menu-text">Modal</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/navs')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/navs">
                                            <span className="menu-text">Navs</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/navbar')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/navbar">
                                            <span className="menu-text">Navbar</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/overlays')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/overlays">
                                            <span className="menu-text">Overlays</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/pagination')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/pagination">
                                            <span className="menu-text">Pagination</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/popovers')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/popovers">
                                            <span className="menu-text">Popovers</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                            <li className="menu-item ">
                                <h3 className="menu-heading menu-toggle">
                                    <i className="menu-bullet menu-bullet-dot"><span></span></i>
                                    <span className="menu-text">P ... T</span>
                                    <i className="menu-arrow"></i>
                                </h3>
                                <ul className="menu-inner">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/progress')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/progress">
                                            <span className="menu-text">Progress</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/spinners')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/spinners">
                                            <span className="menu-text">Spinners</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/table')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/table">
                                            <span className="menu-text">Table</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/tabs')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/tabs">
                                            <span className="menu-text">Tabs</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/tooltips')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/tooltips">
                                            <span className="menu-text">Tooltips</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/react-bootstrap/toasts')}`}>
                                        <NavLink className="menu-link" to="/react-bootstrap/toasts">
                                            <span className="menu-text">Toasts</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>

            {/*Classic submenu*/}
            {/*begin::1 Level*/}
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-rel ${getMenuItemActive('/google-material/inputs/buttons')}`}>
                <NavLink className="menu-link " to="/trainer">
                    <span className="menu-text">Trainer Management</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/e-commerce')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/e-commerce">
                                <span className="menu-text">
                                    eCommerce
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/e-commerce/customers')}`}>
                                        <NavLink className="menu-link" to="/e-commerce/customers">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Customers</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/e-commerce/products')}`}>
                                        <NavLink className="menu-link" to="/e-commerce/products">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Products</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        {/* <li className={`menu-item ${getMenuItemActive('/builder')}`}>
                            <NavLink className="menu-link" to="/builder">
                                <span className="menu-text">Layout Builder</span>
                            </NavLink>
                        </li> */}
                        {/*end::3 Level*/}

                        {/*begin::2 Level*/}
                        <li className={`menu-item ${getMenuItemActive('/user-profile')}`}>
                            <NavLink className="menu-link" to="/user-profile">
                                <span className="menu-text">User Profile</span>
                            </NavLink>
                        </li>
                        {/*end::3 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/error')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/error">
                                <span className="menu-text">
                                    Error Pages
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                                <ul className="menu-subnav">
                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v1')}`}>
                                        <NavLink className="menu-link" to="/error/error-v1">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 1</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v2')}`}>
                                        <NavLink className="menu-link" to="/error/error-v2">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 2</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v3')}`}>
                                        <NavLink className="menu-link" to="/error/error-v3">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 3</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v4')}`}>
                                        <NavLink className="menu-link" to="/error/error-v4">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 4</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v5')}`}>
                                        <NavLink className="menu-link" to="/error/error-v5">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 5</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}

                                    {/*begin::3 Level*/}
                                    <li className={`menu-item ${getMenuItemActive('/error/error-v6')}`}>
                                        <NavLink className="menu-link" to="/error/error-v6">
                                            <i className="menu-bullet menu-bullet-dot"><span /></i>
                                            <span className="menu-text">Error 6</span>
                                        </NavLink>
                                    </li>
                                    {/*end::3 Level*/}
                                </ul>
                            </div>
                        </li>
                        {/*end::2 Level*/}

                    </ul>
                </div>
            </li>
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}