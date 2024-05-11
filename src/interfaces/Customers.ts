export interface ICustomer {
  id: number;
  name: string;
  cpf: string;
  email: string;
  inactive: boolean;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
}

export interface ICustomerResponseWithPagiation {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: ICustomer[];
}

export interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IHowMeet {
  id: number;
  name: string;
}
