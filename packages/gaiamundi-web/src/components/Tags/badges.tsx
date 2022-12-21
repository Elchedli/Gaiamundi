import classNames from 'classnames';

type styles = { [id: string]: [] };

interface styleType {
  default: string[];
  dark: string[];
  red: string[];
  green: string[];
  yellow: string[];
  indigo: string[];
  purple: string[];
  pink: string[];
  [key: string]: string[]; // Add an index signature here
}

const styles: styleType = {
  default: ['blue-100', 'blue-800', 'blue-200', 'blue-800'],
  dark: ['gray-100', 'gray-800', 'gray-700', 'gray-300'],
  red: ['red-100', 'red-800', 'red-200', 'red-900'],
  green: ['green-100', 'green-800', 'green-200', 'green-900'],
  yellow: ['yellow-100', 'yellow-800', 'yellow-200', 'yellow-900'],
  indigo: ['indigo-100', 'indigo-800', 'indigo-200', 'indigo-900'],
  purple: ['purple-100', 'purple-800', 'purple-200', 'purple-900'],
  pink: ['pink-100', 'pink-800', 'pink-200', 'pink-900'],
};

export const Badge = ({
  color,
  tagname,
}: {
  color: string;
  tagname: string;
}) => {
  const selectedColor = styles[color];
  return (
    <span
      className={classNames(
        `bg-${selectedColor[0]} text-${selectedColor[1]} text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${selectedColor[2]} dark:text-${selectedColor[3]}`
      )}
    >
      {tagname}
    </span>
  );
};

// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

// export const BadgesList = () => {
//   return (
//     <div className="flex flex-wrap">
//       {colors.map((color) => (
//         <ColorBadge key={color} color={color} />
//       ))}
//     </div>
//   );
// };
