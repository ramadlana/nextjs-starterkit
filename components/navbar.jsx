import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

const menuNavbar = [
  { url: "/", menuTitle: "Home" },
  { url: "/example/example", menuTitle: "Example" },
  { url: "/dashboard", menuTitle: "Dashboard" },
];

export default function Navbar() {
  return (
    <div>
      <Head>
        <title>Template Rama Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link href="/">
              <a>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={32}
                    className="d-block my-1"
                    viewBox="0 0 118 94"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {menuNavbar.map((menu) => {
                return (
                  <li key={menu.url}>
                    <Link href={menu.url}>
                      <a className="nav-link px-2 link-dark">
                        {menu.menuTitle}
                      </a>
                    </Link>
                  </li>
                );
              })}
              <li className="nav-item dropdown">
                <a
                  className="nav-link px-2 link-dark dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              ></input>
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  src="https://github.com/ramadlana.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                ></Image>
              </a>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <Link href="/user/logout">
                    <a className="dropdown-item">Sign out</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <Script src="/js/jquery-3.3.1.slim.min.js"></Script>
      <Script src="/js/popper.min.js"></Script>
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive"></Script>
    </div>
  );
}