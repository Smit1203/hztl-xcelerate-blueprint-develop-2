// Global
import tailwind from 'tailwind-config';
import { JSX } from 'react';
// Local
import * as twConfig from '../../../../tailwind.config';

const Screens = (): JSX.Element => {
  const config = tailwind.config(twConfig.theme);

  const screens = { ...config.theme.screens, ...config.extend.screens };

  return (
    <div className="container px-16 py-8">
      <div className="max-w-[1000px] w-full"></div>
      <h1 className="font-bold mb-6 text-4xl">Screens</h1>
      <p className="mb-6">
        To enable responsive designs, Tailwind relies on a set of breakpoints. Every utility class
        in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of
        cake to build complex responsive interfaces without ever leaving your HTML.
      </p>
      <div className="grid gap-6">
        {Object.entries(screens)
          .map(([key, value]: [string, string]) => ({
            label: key,
            value: value,
            size: parseInt(value as string, 10),
          }))
          .map((screen) => (
            <div className="border flex gap-8 p-2 rounded-xl" key={screen.label}>
              <div className="flex  flex-col gap-2 min-w-[5rem] self-center">
                <p className="font-bold">{screen.label}</p>
                <p>{screen.value}</p>
              </div>
              <div
                className="bg-[#818CF81A] bg-[length:7.07px_7.07px] h-[5rem] self-center"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg,#6366f180 10%,transparent 0,transparent 50%,#6366f180 0,#6366f180 60%,transparent 0,transparent)',
                  width: screen.size,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Screens;
