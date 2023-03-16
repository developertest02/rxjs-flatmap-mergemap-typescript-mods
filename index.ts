import { Observable, of } from "rxjs";
import { delay, flatMap, map, mergeMap, tap, toArray } from "rxjs/operators";
import { Address, User, UserWithAddress } from "./model";

const users: User[] = [
  {
    id: 0,
    name: "Donald Mayfield"
  },
  {
    id: 1,
    name: "Jill J. Fritz"
  },
  {
    id: 2,
    name: "Terry Buttram"
  }
];

const address: Address[] = [
  {
    street: "2180 BELLFLOWER",
    country: "USA",
    state: "AL",
    city: "Madison",
    zipCode: 35064
  },
  {
    street: "845 ODOM ROAD, SUITE 200",
    country: "USA",
    state: "CA",
    city: "Los Angeles",
    zipCode: 90720
  },
  {
    street: "9025 QUEENS BLVD",
    country: "USA",
    state: "NY",
    city: "Queens",
    zipCode: 11355
  }
];


const randomDelay = (): number => Math.random() * 5000 + 1;

// --- No delay
// const getAddress = (userId: number): Observable<Address> => of(address[userId]);

// --- function notation
// function getAddress(userId: number): Observable<Address> {
//   return of(address[userId]).pipe(
//     tap(() => console.log(`getAddress(${userId})]. Started`)),
//     delay(randomDelay()),
//     tap(() => console.log(`getAddress(${userId}). Finished`))
//   );
// }

// A helper function - getAddress(id) by userId
const getAddress = (userId: number): Observable<Address> =>
  of(address[userId]).pipe(
    tap(() => console.log(`getAddress(${userId})]. Started`)),
    delay(randomDelay()),
    tap(() => console.log(`getAddress(${userId}). Finished`))
  );

// Observables - declaration
let users$: Observable<User[]>;
let address$: Observable<UserWithAddress[]>;

// Observables - assignation
users$ = of(users);

address$ = users$.pipe(
  flatMap(users => users),
  mergeMap(user => {
    const address$: Observable<UserWithAddress> = getAddress(user.id).pipe(
      map(address=>{
        const result$:UserWithAddress = {
          user,
          address
        };
        return result$
      })
    );  
    return address$;
  }),
  toArray()
);

// Subscription
// address$.subscribe((response:UserWithAddress[]) => {
//   console.log({ response }); // Prints the array of addresses: Address[]
// });

address$.subscribe((response)=>console.log(response))