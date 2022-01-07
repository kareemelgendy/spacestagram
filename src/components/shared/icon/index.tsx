import Image from 'next/image'
import styles from './icon.module.scss'

interface IconProps {
  name: string
  fill?: boolean
  size?: number
  ariaLabel?: string
  onClick?: () => void
}

const Icon = ({ name, fill, size, ariaLabel, onClick }: IconProps): JSX.Element => {
  const BoxIcon = () => (
    <Image
      src={`/assets/icons/${name}${fill ? `_filled` : ``}.svg`}
      alt={`${name}-icon`}
      width={size || '24px'}
      height={size || '24px'}
      aria-label={ariaLabel}
      loading="eager"
    />
  )

  return onClick ? (
    <button className={styles.wrapper__button} onClick={onClick}>
      <BoxIcon />
    </button>
  ) : (
    <div className={styles.wrapper}>
      <BoxIcon />
    </div>
  )
}

export default Icon
