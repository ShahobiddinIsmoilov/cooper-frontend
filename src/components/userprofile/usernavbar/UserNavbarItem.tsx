interface Props {
  value: string;
  active: string;
}

export default function UserNavbarItem({ value, active }: Props) {
  return (
    <span
      className={`text-xl py-2 px-4 rounded-full hover:bg-dark-700 ${
        active === value.toLowerCase() && "bg-dark-700 text-white"
      }`}
    >
      {value}
    </span>
  );
}
