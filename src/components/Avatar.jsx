import { getInitials, generateAvatarColor } from '../utils/avatarUtils';

export default function Avatar({ name, size = 'medium' }) {
  const initials = getInitials(name);
  const colorClass = generateAvatarColor(name);

  const sizeClasses = {
    small: 'h-10 w-10 text-sm',
    medium: 'h-24 w-24 text-3xl',
    large: 'h-32 w-32 text-5xl',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ring-2 ring-indigo-400 ${
        colorClass
      } ${sizeClasses[size] || sizeClasses.medium}`}
    >
      <span>{initials}</span>
    </div>
  );
}