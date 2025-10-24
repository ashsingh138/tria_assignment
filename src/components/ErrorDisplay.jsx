import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function ErrorDisplay({ message }) {
  return (
    <div className="rounded-md bg-red-900 bg-opacity-50 p-6 text-center">
      <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-300">
        An Error Occurred
      </h3>
      <p className="mt-2 text-red-300">{message}</p>
    </div>
  );
}