import clsx from 'clsx'

export function AppFrame({
  className,
  children,
  priority = false,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { priority?: boolean }) {
  return (
    <div className={clsx('aspect-[366/777]', className)} {...props}>
      <svg
        width="512"
        height="777"
        viewBox="0 0 512 777"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <g filter="url(#filter0_dd_108_2553)">
          <g filter="url(#filter1_b_108_2553)">
            <rect
              x="31"
              y="21"
              width="450"
              height="700"
              rx="10"
              fill="#F6F6F6"
            />
            <rect
              x="30.75"
              y="20.75"
              width="450.5"
              height="700.5"
              rx="10.25"
              stroke="black"
              stroke-opacity="0.12"
              stroke-width="0.5"
            />
          </g>
          <g filter="url(#filter2_di_108_2553)">
            <path
              d="M31 37C31 31.3995 31 28.5992 32.0899 26.4601C33.0487 24.5785 34.5785 23.0487 36.4601 22.0899C38.5992 21 41.3995 21 47 21H465C470.601 21 473.401 21 475.54 22.0899C477.422 23.0487 478.951 24.5785 479.91 26.4601C481 28.5992 481 31.3995 481 37V49H31V37Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45 41C48.3137 41 51 38.3137 51 35C51 31.6863 48.3137 29 45 29C41.6863 29 39 31.6863 39 35C39 38.3137 41.6863 41 45 41Z"
              fill="#EC6A5E"
            />
            <path
              d="M50.75 35C50.75 38.1756 48.1756 40.75 45 40.75C41.8244 40.75 39.25 38.1756 39.25 35C39.25 31.8244 41.8244 29.25 45 29.25C48.1756 29.25 50.75 31.8244 50.75 35Z"
              stroke="black"
              stroke-opacity="0.12"
              stroke-width="0.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M65 41C68.3137 41 71 38.3137 71 35C71 31.6863 68.3137 29 65 29C61.6863 29 59 31.6863 59 35C59 38.3137 61.6863 41 65 41Z"
              fill="#F5BF4F"
            />
            <path
              d="M70.75 35C70.75 38.1756 68.1756 40.75 65 40.75C61.8244 40.75 59.25 38.1756 59.25 35C59.25 31.8244 61.8244 29.25 65 29.25C68.1756 29.25 70.75 31.8244 70.75 35Z"
              stroke="black"
              stroke-opacity="0.12"
              stroke-width="0.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M85 41C88.3137 41 91 38.3137 91 35C91 31.6863 88.3137 29 85 29C81.6863 29 79 31.6863 79 35C79 38.3137 81.6863 41 85 41Z"
              fill="#61C554"
            />
            <path
              d="M90.75 35C90.75 38.1756 88.1756 40.75 85 40.75C81.8244 40.75 79.25 38.1756 79.25 35C79.25 31.8244 81.8244 29.25 85 29.25C88.1756 29.25 90.75 31.8244 90.75 35Z"
              stroke="black"
              stroke-opacity="0.12"
              stroke-width="0.5"
            />
            <path
              d="M234.396 40V32.4209H231.648V30.8403H239.062V32.4209H236.313V40H234.396ZM241.219 40.1079C239.886 40.1079 238.94 39.2827 238.94 38.0132V38.0005C238.94 36.7437 239.911 36.0073 241.65 35.9058L243.339 35.8042V35.2266C243.339 34.6235 242.926 34.2808 242.165 34.2808C241.498 34.2808 241.073 34.5156 240.927 34.9282L240.914 34.9536H239.2L239.207 34.8965C239.353 33.6714 240.508 32.8589 242.266 32.8589C244.12 32.8589 245.167 33.7349 245.167 35.2266V40H243.339V39.0732H243.225C242.869 39.7207 242.133 40.1079 241.219 40.1079ZM240.749 37.8989C240.749 38.4321 241.2 38.7559 241.841 38.7559C242.698 38.7559 243.339 38.1909 243.339 37.4546V36.9404L241.93 37.0293C241.136 37.0801 240.749 37.3784 240.749 37.8862V37.8989ZM249.711 40.146C247.813 40.146 246.734 39.2954 246.6 38.0957L246.594 38.0703H248.416L248.428 38.0957C248.574 38.5273 249 38.8384 249.73 38.8384C250.441 38.8384 250.923 38.5337 250.923 38.0703V38.0576C250.923 37.6831 250.644 37.4482 249.933 37.2896L248.765 37.042C247.432 36.7563 246.772 36.1025 246.772 35.0552V35.0488C246.772 33.7349 247.94 32.8589 249.685 32.8589C251.52 32.8589 252.535 33.7729 252.612 34.8965V34.9219H250.891L250.885 34.8901C250.783 34.5156 250.371 34.1665 249.679 34.1665C249.038 34.1665 248.581 34.4648 248.581 34.9346V34.9409C248.581 35.3154 248.841 35.5312 249.565 35.6899L250.726 35.9375C252.123 36.2358 252.777 36.8198 252.777 37.8545V37.8608C252.777 39.2446 251.501 40.146 249.711 40.146ZM254.305 40V30.3389H256.159V35.7725H256.273L258.609 33.0112H260.71L258.025 35.9756L260.894 40H258.704L256.667 37.1182L256.159 37.6577V40H254.305ZM262.956 31.9385C262.385 31.9385 261.908 31.4814 261.908 30.9102C261.908 30.3325 262.385 29.8755 262.956 29.8755C263.527 29.8755 263.997 30.3325 263.997 30.9102C263.997 31.4814 263.527 31.9385 262.956 31.9385ZM262.023 40V33.0112H263.876V40H262.023ZM268.794 40.146C266.643 40.146 265.348 38.7812 265.348 36.5088V36.4961C265.348 34.2427 266.662 32.8589 268.794 32.8589C270.927 32.8589 272.241 34.2363 272.241 36.4961V36.5088C272.241 38.7876 270.946 40.146 268.794 40.146ZM268.794 38.6924C269.778 38.6924 270.343 37.8862 270.343 36.5088V36.4961C270.343 35.1313 269.772 34.3125 268.794 34.3125C267.811 34.3125 267.246 35.1313 267.246 36.4961V36.5088C267.246 37.8862 267.804 38.6924 268.794 38.6924ZM273.7 40V33.0112H275.553V34.0903H275.668C275.985 33.335 276.677 32.8589 277.674 32.8589C279.229 32.8589 280.067 33.811 280.067 35.4805V40H278.213V35.8994C278.213 34.9155 277.807 34.395 276.931 34.395C276.074 34.395 275.553 35.0107 275.553 35.9565V40H273.7Z"
              fill="#3D3D3D"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_dd_108_2553"
            x="0.5"
            y="0.5"
            width="511"
            height="776"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="25" />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_108_2553"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_108_2553"
              result="effect2_dropShadow_108_2553"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_108_2553"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_b_108_2553"
            x="-49.5"
            y="-59.5"
            width="611"
            height="861"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="40" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_108_2553"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_108_2553"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_di_108_2553"
            x="31"
            y="21"
            width="450"
            height="28.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_108_2553"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_108_2553"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_108_2553"
            />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0 left-20 top-14">{children}</div>
    </div>
  )
}
