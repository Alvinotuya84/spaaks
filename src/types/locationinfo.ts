type Flag = {
  img: string;
  emoji: string;
  emoji_unicode: string;
};

type Connection = {
  asn: number;
  org: string;
  isp: string;
  domain: string;
};

type Timezone = {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number;
  utc: string;
  current_time: string;
};

export type IpLocationResponse = {
  'About Us': string;
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: Flag;
  connection: Connection;
  timezone: Timezone;
};
