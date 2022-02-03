# Indie on the Move

Indie on the Move uses a JSON API so it's way easier than the San Diego site.

```ts
// type mostly trimmed to things I'll use
type UsersResponse = {
  data: [
    {
      country: string;
      state: string;
      city: string;
      display_name: string;
      bio: string;
      localclubs: string;
      website: string;
      songkick: string;
      soundcloud: string;
      created_at: string;
      genres: {
        data: [{
            id: number;
            genre: string;
            order: number;
          }];
      }
    }
  ],
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: {
        previous?: string;
        next?: string;
      }
    }
  }
}
```
