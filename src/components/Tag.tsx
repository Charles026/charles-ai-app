
interface TagProps {
  label: string;
  key: string;
}

const Tag = ({ label }: TagProps) => {
  return (
    <span key={label} className="inline-block px-3 py-1 text-sm border border-gray-700 rounded-full">
      {label}
    </span>
  );
};

export default Tag;
