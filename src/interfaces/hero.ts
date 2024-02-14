export interface Hero {
  id: number;
  name: string;
  title: string; 
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  comics: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  
}
