const toArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      }
    } catch (error) {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
};

export const serializeArray = (value) => JSON.stringify(toArray(value));

export const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  return ['true', '1', 'yes', 'on'].includes(String(value).toLowerCase());
};

const withCommonFields = (row) => ({
  id: row.id,
  _id: row.id !== undefined && row.id !== null ? String(row.id) : undefined,
  createdAt: row.created_at ?? row.createdAt ?? null,
  updatedAt: row.updated_at ?? row.updatedAt ?? row.created_at ?? row.createdAt ?? null
});

export const formatUser = (row) => ({
  ...withCommonFields(row),
  name: row.name,
  email: row.email,
  role: row.role ?? 'admin'
});

export const formatRoom = (row) => ({
  ...withCommonFields(row),
  roomName: row.roomName,
  roomType: row.roomType,
  price: Number(row.price),
  description: row.description,
  facilities: toArray(row.facilities),
  maxGuests: Number(row.maxGuests),
  image: row.image,
  available: parseBoolean(row.available, true)
});

export const formatGalleryItem = (row) => ({
  ...withCommonFields(row),
  title: row.title,
  image: row.image,
  category: row.category
});

export const formatContactMessage = (row) => ({
  ...withCommonFields(row),
  name: row.name,
  email: row.email,
  phone: row.phone ?? '',
  message: row.message
});

const formatRoomReference = (row) => {
  const hasRoomDetails = row.room_id !== undefined || row.room_roomName !== undefined || row.room_roomType !== undefined || row.room_price !== undefined || row.room_description !== undefined || row.room_facilities !== undefined || row.room_maxGuests !== undefined || row.room_image !== undefined || row.room_available !== undefined;

  if (!hasRoomDetails) {
    return row.roomId ?? null;
  }

  const roomId = row.room_id ?? row.roomId;

  return {
    id: roomId,
    _id: String(roomId),
    roomName: row.room_roomName ?? row.roomName ?? row.room_name ?? null,
    roomType: row.room_roomType ?? row.roomType ?? row.room_type ?? null,
    price: row.room_price !== undefined && row.room_price !== null ? Number(row.room_price) : row.price !== undefined && row.price !== null ? Number(row.price) : null,
    description: row.room_description ?? row.description ?? null,
    facilities: toArray(row.room_facilities ?? row.facilities),
    maxGuests: row.room_maxGuests !== undefined && row.room_maxGuests !== null ? Number(row.room_maxGuests) : row.maxGuests !== undefined && row.maxGuests !== null ? Number(row.maxGuests) : null,
    image: row.room_image ?? row.image ?? null,
    available: parseBoolean(row.room_available ?? row.available, true)
  };
};

export const formatBooking = (row) => ({
  ...withCommonFields(row),
  customerName: row.customerName,
  email: row.email,
  phone: row.phone,
  roomId: formatRoomReference(row),
  roomType: row.roomType,
  checkIn: row.checkIn,
  checkOut: row.checkOut,
  guests: Number(row.guests),
  specialRequest: row.specialRequest ?? '',
  status: row.status ?? 'Pending'
});