export const Dropdown: React.FC = () => {
  return (
    <div>
      <details className="dropdown">
        <summary className="btn m-1 ">zodiac model</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
    </div>

  )
}