/** @type {import('tailwindcss').Config} */

/*
 * Manaber visual language — flat colour blocks, zero radius, zero gradients.
 *
 * The palette is six flat fills plus black and white. Nothing is tinted,
 * blurred or gradiented: sections are separated by colour and whitespace,
 * never by rules or shadows. See design_planning.md at the repo root for the
 * full contract, including every approved text/ground pairing.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Primary accent card fill. Carries black or indigo text. */
        periwinkle: '#8587FF',
        /* Soft card fill and the FAQ ground. Carries black or indigo text. */
        lavender: '#C0C0FF',
        /* Primary CTA fill. Black text only — never white. */
        lime: {
          DEFAULT: '#C8FC00',
          deep: '#B4E300',
        },
        /* Dark feature slab. Carries white, lavender or lime text. */
        indigo: {
          DEFAULT: '#2E0A78',
          deep: '#210757',
        },
        /* Muted card fill used on black sections. White text only. */
        slate: {
          DEFAULT: '#4A4458',
          deep: '#37323F',
        },
        /* Neutral ramp. 900/950 are the near-blacks; ink is pure black. */
        ink: '#000000',
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#000000',
        },
      },
      fontFamily: {
        /* Multi-word family names MUST be quoted here. Tailwind emits this
         * list verbatim, and an unquoted `Segoe UI` / `Source Serif 4` is
         * invalid CSS — the browser drops the whole font-family declaration
         * and the face silently falls back. */
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        /* Upright roman transitional serif at REGULAR weight. Never italic,
         * never bold — size and colour carry the hierarchy instead. */
        display: [
          '"Roboto Serif"',
          '"Source Serif 4"',
          '"Iowan Old Style"',
          'Charter',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
      },
      fontSize: {
        /* Uppercase labels, eyebrows and button faces. */
        label: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.1em' }],
        'label-lg': ['0.875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
        /* Fluid display ramp — all serif, all weight 400. */
        'display-xl': ['clamp(2.75rem, 5.6vw, 4.5rem)', { lineHeight: '1.06' }],
        'display-lg': ['clamp(2.25rem, 4.2vw, 3.5rem)', { lineHeight: '1.08' }],
        'display-md': ['clamp(1.875rem, 2.8vw, 2.5rem)', { lineHeight: '1.12' }],
        'display-sm': ['clamp(1.5rem, 1.9vw, 1.875rem)', { lineHeight: '1.18' }],
        'display-xs': ['1.375rem', { lineHeight: '1.25' }],
      },
      borderRadius: {
        /* ZERO RADIUS RULE. Every surface is sharp-cornered. The legacy
         * `card` / `panel` / `frame` tokens are kept only so they resolve to
         * 0 wherever older markup still references them. */
        card: '0px',
        panel: '0px',
        frame: '0px',
      },
      boxShadow: {
        /* Shadows are near-absent by design. `lift` is the only one, used on
         * the floating nav card so it separates from a photographic hero. */
        lift: '0 18px 40px -24px rgba(0, 0, 0, 0.55)',
        hairline: '0 0 0 1px rgba(0, 0, 0, 0.10)',
        card: 'none',
        'card-hover': 'none',
        frame: 'none',
        button: 'none',
      },
      letterSpacing: {
        eyebrow: '0.1em',
        wide: '0.06em',
      },
      maxWidth: {
        prose: '62ch',
        shell: '1200px',
      },
      spacing: {
        /* The speech-bubble tail. One number, used everywhere. */
        tail: '34px',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'drawer-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 900ms ease-out both',
        'drawer-in': 'drawer-in 200ms ease-out both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
