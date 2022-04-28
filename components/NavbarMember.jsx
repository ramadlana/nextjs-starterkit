import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

const menuNavbar = [
  { url: "/", menuTitle: "Home" },
  { url: "/dashboard", menuTitle: "Dashboard" },
];

const menuNavbarDropdown = [
  {
    url: "/example/dashboard-prod",
    menuTitle: "Dashboard Table",
  },
  { url: "/example/zustand", menuTitle: "Zustand State Management" },
  { url: "/example/example", menuTitle: "Table & Modal" },
  { url: "/example/csr-swr", menuTitle: "CSR SWR" },
  {
    url: "/example/ssr-getserversideprops",
    menuTitle: "SSR - Server Side Props",
  },
  {
    url: "/example/table-useeffect-useswr",
    menuTitle: "useEffect useSwr Table",
  },
];

export default function NavbarMember() {
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
                    fill="currentColor"
                    className="bi bi-box-seam"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
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
                  Examples
                </a>
                <ul className="dropdown-menu">
                  {menuNavbarDropdown.map((menu) => {
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
                </ul>
              </li>
            </ul>

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