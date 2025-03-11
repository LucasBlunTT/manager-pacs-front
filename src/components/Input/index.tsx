import { Input } from '@/components/ui/input';

interface InputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function InputText({
  value,
  onChange,
  placeholder,
}: InputTextProps) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-center"
      />
    </div>
  );
}
