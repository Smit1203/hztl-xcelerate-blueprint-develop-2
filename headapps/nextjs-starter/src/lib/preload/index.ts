// This file is used to execute any code before app is loaded.
// It is imported to ensure it is loaded before the componentBuilder.
import { defaultConfig } from 'tailwind-variants';

// This needs to be set to false, otherwise TailwindVariants will remove our custom classes.
defaultConfig.twMerge = false;
