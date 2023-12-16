'use client'

import { cn } from '@/utils/buttonUtils'
import { Sparkles } from 'lucide-react'

type Props = {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function SpotlightButton({ text, onClick, className, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'group relative mx-auto inline-flex h-10 items-center overflow-hidden rounded-xl bg-[#191919] px-5 hover:bg-[#333] transition disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      style={{
        transition: 'background 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
      }}
    >
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
        <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-100 transition duration-300  [animation-duration:3s]"></div>
      </div>

      <div className="absolute inset-0.5 rounded-xl bg-[#121212]"></div>

      <div className="absolute bottom-0 left-1/2  h-2/3 w-4/5 -translate-x-1/2 rounded-xl bg-white/10 opacity-100 blur-md transition-all duration-500"></div>

      <span className="flex-center relative gap-2 bg-gradient-to-b from-white/25  to-white bg-clip-text font-semibold text-transparent transition-all text-[0.95rem] duration-200" >
        {text}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#898aeb"
          className="fill-yellow-400/50 stroke-[1] text-yellow-400"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.78716 1.30631C9.54417 0.897897 10.4558 0.897897 11.2128 1.30631C11.6773 1.5569 11.9959 2.00745 12.2705 2.4931C12.5496 2.98655 12.8557 3.65477 13.2362 4.48551L13.2515 4.51897C13.465 4.98521 13.5142 5.07453 13.5695 5.1376C13.6432 5.22168 13.7348 5.28823 13.8376 5.33241C13.9146 5.36555 14.0148 5.38467 14.5241 5.44374L14.6758 5.46133C15.5346 5.56092 16.2255 5.64104 16.7528 5.74591C17.2714 5.84907 17.7724 5.99934 18.1446 6.33101C18.8333 6.94469 19.1378 7.882 18.9413 8.78335C18.8351 9.2705 18.5181 9.6866 18.1591 10.075C17.7942 10.4698 17.2823 10.9408 16.646 11.5263L16.6204 11.5498C16.2256 11.9131 16.1522 11.9916 16.1087 12.0662C16.0431 12.179 16.008 12.3069 16.0067 12.4373C16.0059 12.5237 16.0289 12.6287 16.1826 13.1427L16.2194 13.2658C16.5219 14.278 16.7644 15.0897 16.8912 15.725C17.0154 16.348 17.0691 16.9748 16.814 17.5198C16.4996 18.1914 15.9089 18.6932 15.1954 18.895C14.6165 19.0587 14.0068 18.9043 13.4121 18.6809C12.8058 18.4531 12.0442 18.0824 11.0944 17.6202L10.7973 17.4756C10.3002 17.2336 10.1992 17.1943 10.108 17.1819C10.0388 17.1725 9.96857 17.1727 9.89942 17.1827C9.80827 17.1959 9.70762 17.236 9.21251 17.4819L8.95 17.6122C7.99018 18.0889 7.22084 18.471 6.60835 18.7063C6.00811 18.937 5.39184 19.0974 4.80608 18.9322C4.10046 18.7331 3.51435 18.2404 3.19686 17.5794C2.9333 17.0307 2.9853 16.3959 3.10914 15.7648C3.23551 15.1208 3.47943 14.2971 3.78375 13.2693L3.82132 13.1425C3.97348 12.6286 3.99619 12.5237 3.99518 12.4374C3.99367 12.3074 3.9585 12.1801 3.89312 12.0679C3.84967 11.9933 3.77636 11.9149 3.38201 11.5521L3.35636 11.5285C2.71907 10.9421 2.2064 10.4703 1.84096 10.0749C1.48148 9.68584 1.16412 9.26901 1.0582 8.78097C0.862923 7.88114 1.16677 6.94581 1.85355 6.33263C2.22605 6.00006 2.72776 5.84943 3.24719 5.74604C3.77524 5.64095 4.46722 5.56071 5.32742 5.46096L5.47593 5.44374C5.98525 5.38467 6.08536 5.36555 6.16243 5.33241C6.26517 5.28823 6.35675 5.22168 6.4305 5.1376C6.48583 5.07453 6.53495 4.98521 6.7485 4.51897L6.76382 4.48553C7.14432 3.65478 7.45037 2.98656 7.72945 2.4931C8.00411 2.00745 8.32267 1.5569 8.78716 1.30631ZM10.4994 2.62924C10.1877 2.46107 9.8123 2.46107 9.50059 2.62924C9.43332 2.66553 9.28926 2.78798 9.03749 3.23316C8.79387 3.66393 8.51414 4.27306 8.11476 5.14501C8.10351 5.16958 8.09238 5.19396 8.08134 5.21814C7.92089 5.56951 7.77976 5.87857 7.56016 6.12892C7.33891 6.38115 7.06416 6.58081 6.75595 6.71333C6.45005 6.84486 6.11257 6.8836 5.72888 6.92765C5.70248 6.93068 5.67585 6.93374 5.64901 6.93685L5.53511 6.95006C4.63228 7.05476 4.00141 7.12852 3.54048 7.22026C3.06387 7.31512 2.90781 7.40622 2.85431 7.45399C2.57151 7.70647 2.4464 8.09161 2.52681 8.46213C2.54202 8.53222 2.61474 8.69767 2.94458 9.05462C3.26357 9.39982 3.7306 9.83038 4.39948 10.4459C4.42037 10.4651 4.44111 10.4841 4.46167 10.503C4.75831 10.7753 5.01878 11.0144 5.19168 11.3113C5.38784 11.6481 5.49334 12.0301 5.49789 12.4198C5.5019 12.7634 5.4011 13.1023 5.2863 13.4883C5.27835 13.5151 5.27032 13.5421 5.26226 13.5693L5.23645 13.6565C4.91768 14.733 4.69485 15.4885 4.58381 16.0543C4.46863 16.6413 4.51399 16.8505 4.55145 16.9285C4.68218 17.2006 4.92352 17.4035 5.21407 17.4855C5.29731 17.509 5.51118 17.5177 6.06947 17.3032C6.60765 17.0964 7.31331 16.7469 8.31875 16.2475L8.54417 16.1356C8.57009 16.1227 8.59577 16.1099 8.62125 16.0972C8.99467 15.9112 9.32421 15.747 9.68492 15.695C9.89235 15.6651 10.1029 15.6642 10.3106 15.6925C10.6717 15.7416 11.0025 15.9032 11.3774 16.0862C11.403 16.0987 11.4288 16.1113 11.4548 16.124L11.7151 16.2506C12.7102 16.735 13.4083 17.0738 13.9406 17.2738C14.4923 17.4811 14.7039 17.472 14.7865 17.4486C15.0803 17.3655 15.3235 17.1589 15.453 16.8823C15.4894 16.8045 15.5327 16.5972 15.4174 16.019C15.3062 15.4613 15.0847 14.7175 14.7677 13.6569L14.7427 13.5732C14.7346 13.546 14.7265 13.519 14.7184 13.4922C14.6025 13.1061 14.5008 12.7671 14.504 12.4233C14.5077 12.0319 14.6131 11.6482 14.81 11.3099C14.983 11.0128 15.2437 10.7734 15.5407 10.5009C15.5613 10.482 15.582 10.4629 15.6029 10.4436C16.2708 9.82913 16.7371 9.39924 17.0556 9.05461C17.385 8.69824 17.4577 8.53305 17.473 8.4631C17.5539 8.09196 17.4285 7.70601 17.1449 7.45332C17.0915 7.40569 16.9356 7.31482 16.4597 7.22016C15.9994 7.12861 15.3696 7.05497 14.4682 6.95044L14.351 6.93685C14.3241 6.93374 14.2975 6.93068 14.2711 6.92765C13.8874 6.8836 13.55 6.84486 13.244 6.71333C12.9358 6.58081 12.6611 6.38115 12.4398 6.12892C12.2202 5.87857 12.0791 5.56951 11.9187 5.21814C11.9076 5.19396 11.8965 5.16958 11.8852 5.14501C11.4859 4.27306 11.2061 3.66393 10.9625 3.23316C10.7107 2.78798 10.5667 2.66553 10.4994 2.62924Z"
            fill="#898AEB"
            className="fill-yellow-400/50 stroke-[1] text-yellow-400"
          />
        </svg> */}
        <Sparkles
          style={{
            transition: 'all 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
          }}
          className="w-5 h-5 fill-[#898aeb]/20 stroke-[1] text-purple group-hover:rotate-180 "
        />
      </span>
    </button>
  )
}
