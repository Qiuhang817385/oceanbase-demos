type StyleConfigType = Record<
  'large' | 'middle' | 'small',
  Record<'core' | 'small' | 'edge', { multiply: number[]; gap?: number }>
>

type InstanceStyleConfigType = Record<
  'large' | 'middle' | 'small',
  { multiply: number[]; gap?: number }
>

const MIDDLE_MULTIPLY = 1.2
const SMALL_MULTIPLY = 1.5
const TENANT_MYLTIPLY = 1.1

export const MYSQL_RESPONSIVE_SIZE: StyleConfigType = {
  large: {
    core: {
      multiply: [6, 5.4],
    },
    small: {
      multiply: [12, 12],
    },
    edge: {
      multiply: [25, 25],
    },
  },
  middle: {
    core: {
      multiply: [6 * MIDDLE_MULTIPLY, 5.4 * MIDDLE_MULTIPLY],
    },
    small: {
      multiply: [12 * MIDDLE_MULTIPLY, 12 * MIDDLE_MULTIPLY],
    },
    edge: {
      multiply: [25 * MIDDLE_MULTIPLY, 25 * MIDDLE_MULTIPLY],
    },
  },
  small: {
    core: {
      multiply: [6 * SMALL_MULTIPLY, 5.4 * SMALL_MULTIPLY],
    },
    small: {
      multiply: [12 * SMALL_MULTIPLY, 12 * SMALL_MULTIPLY],
    },
    edge: {
      multiply: [25 * SMALL_MULTIPLY, 25 * SMALL_MULTIPLY],
    },
  },
}

export const OB_INSTANCE_RESPONSIVE_SIZE: InstanceStyleConfigType = {
  large: {
    multiply: [2.5, 1.8],
  },
  middle: {
    multiply: [2 * MIDDLE_MULTIPLY, 1.8 * MIDDLE_MULTIPLY],
  },
  small: {
    multiply: [1.8 * SMALL_MULTIPLY, 1.8 * MIDDLE_MULTIPLY],
  },
}

export const OB_TENANT_RESPONSIVE_SIZE: StyleConfigType = {
  large: {
    core: {
      multiply: [6 * TENANT_MYLTIPLY, 5.4 * 1.3 * TENANT_MYLTIPLY],
    },
    small: {
      multiply: [12 * TENANT_MYLTIPLY, 12 * 1.3 * TENANT_MYLTIPLY],
    },
    edge: {
      multiply: [25 * TENANT_MYLTIPLY, 25 * TENANT_MYLTIPLY],
    },
  },
  middle: {
    core: {
      multiply: [
        6 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
        5.4 * 1.3 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
      ],
    },
    small: {
      multiply: [
        12 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
        12 * 1.3 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
      ],
    },
    edge: {
      multiply: [
        25 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
        25 * TENANT_MYLTIPLY * MIDDLE_MULTIPLY,
      ],
      gap: 12,
    },
  },
  small: {
    core: {
      multiply: [
        6 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
        5.4 * 1.3 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
      ],
    },
    small: {
      multiply: [
        12 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
        12 * 1.3 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
      ],
    },
    edge: {
      multiply: [
        25 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
        25 * TENANT_MYLTIPLY * SMALL_MULTIPLY,
      ],
      gap: 8,
    },
  },
}
