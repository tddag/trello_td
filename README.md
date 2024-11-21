# Set up

- Install [Node](https://nodejs.org/en/download/)
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/8.0.html)
- Install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- Clone the repository `git clone https://github.com/tddag/trello_td`
- Install dependencies `npm install`
- Setup environment variables:
  - <table>
        <tr>
            <th>Variable</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</td>
            <td>pk_test.....</td>
            <td>Next Clerk public key (https://clerk.com/docs/quickstarts/nextjs)</td>
        </tr>
        <tr>
            <td>CLERK_SECRET_KEY</td>
            <td>sk_test.....</td>
            <td>Clerk secret key (https://clerk.com/docs/quickstarts/nextjs)</td>
        </tr>        
        <tr>
            <td>DB_PASS</td>
            <td>......</td>
            <td>MySQL DB password<td>
        </tr>   
        <tr>
            <td>NEXT_PUBLIC_UNSPLASH_ACCESS_KEY</td>
            <td>pk_test.....</td>
            <td>Unsplash access key (https://unsplash.com/documentation)</td>
        </tr>                   
    </table>
- Setup Database

  - Create trello database
    - `CREATE SCHEMA trello;`
  - Use trello database
    - `USE trello;`
  - Create board table

    - ```
        CREATE TABLE board (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(50),
            orgId VARCHAR(500),
            imageId VARCHAR(500),
            imageThumbUrl VARCHAR(500),
            imageFullUrl VARCHAR(500),
            imageUserName VARCHAR(500),
            imageLinkHTML VARCHAR(500),
            createdAt DATETIME DEFAULT NOW(),
            updatedAt DATETIME DEFAULT NOW();
        );
      ```

    ```

    ```

  - Create list table

    - ```
        CREATE TABLE list (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(200),
            `order` INT,
            boardId INT,
            createdAt DATETIME DEFAULT NOW(),
            updatedAt DATETIME DEFAULT NOW(),
            CONSTRAINT fk_board_id FOREIGN KEY (boardId) REFERENCES board(id) ON DELETE CASCADE
        )
      ```

    ```

    ```

  - Create card table

    - ```
        CREATE TABLE card (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(200),
            `order` INT,
            description VARCHAR(1000),
            listId INT,
            createdAt DATETIME DEFAULT NOW(),
            updatedAt DATETIME DEFAULT NOW(),
            FOREIGN KEY (listId) REFERENCES list(id) ON DELETE CASCADE
        );
      ```

    ```

    ```

  - Create auditLog table

    - ```
        CREATE TABLE auditLog (
            id INT PRIMARY KEY AUTO_INCREMENT,
            orgId VARCHAR(100),
            action VARCHAR(20),
            entityId VARCHAR(100),
            entityType VARCHAR(20),
            entityTitle VARCHAR(200),
            userId VARCHAR(200),
            userImage VARCHAR(200),
            userName VARCHAR(100),
            createdAt DATETIME DEFAULT NOW(),
            updatedAt DATETIME  DEFAULT NOW()
        );
      ```

    ```

    ```

- Run the app `npm run dev`

# Functionalities

- Clerk Authentication:
  - <table>
        <tr>
            <td><img src="./screenshots/home_page.png" alt="home_page"></td>
            <td><img src="./screenshots/clerk_login.png" alt="clerk_login"></td>
        </tr>
    </table>
- Create new Clerk Organization:
  - <table>
        <tr>
            <td><img src="./screenshots/create_clerk_org_1.png" alt="create_clerk_org_1"></td>
            <td><img src="./screenshots/create_clerk_org_2.png" alt="create_clerk_org_2"></td>
        </tr>
    </table>
- Create new board:
  - <table>
        <tr>
            <td><img src="./screenshots/create_board_1.png" alt="create_board_1"></td>
            <td><img src="./screenshots/create_board_2.png" alt="create_board_2"></td>
            <td><img src="./screenshots/create_board_3.png" alt="create_board_3"></td>
        </tr>
    </table>
- Create new list:
  - <table>
        <tr>
            <td><img src="./screenshots/create_list_1.png" alt="create_list_1"></td>
            <td><img src="./screenshots/create_list_2.png" alt="create_list_2"></td>
        </tr>
    </table>
- Create new card:
  - <table>
        <tr>
            <td><img src="./screenshots/add_card_1.png" alt="add_card_1"></td>
            <td><img src="./screenshots/add_card_2.png" alt="add_card_2"></td>
        </tr>
    </table>
- Drag and Drop List
  - <table>
        <tr>
            <td><img src="./screenshots/drag_and_drop_list.png" alt="drag_and_drop_list"></td>
        </tr>
    </table>
- Drag and Drop Card
  - <table>
        <tr>
            <td><img src="./screenshots/drag_and_drop_card.png" alt="drag_and_drop_card"></td>
        </tr>
    </table>
- Card Details, Copy Card, Delete Card, Update Title, Update Description
  - <table>
        <tr>
            <td><img src="./screenshots/card_details.png" alt="card_details"></td>
        </tr>
    </table>
- List Actions, Add a Card, Copy List, Delete List
  - <table>
        <tr>
            <td><img src="./screenshots/list_actions.png" alt="list_actions"></td>
        </tr>
    </table>
- Audit Logs
  - Create Board
  - Update Board
  - Delete Board
  - Create Card
  - Copy Card
  - Update Card
  - Delete Card
  - Create List
  - Update List
  - Copy List
  - Delete List
  - <table>
        <tr>
            <td><img src="./screenshots/audit_log_1.png" alt="audit_log_1"></td>
            <td><img src="./screenshots/audit_log_2.png" alt="audit_log_2"></td>
        </tr>
    </table>

# Technologies/Libraries:

- Next.js: Web Framework
- React: UI Library
- Shadcn: Component Library
- TailwindCSS: CSS Framework
- Clerk: Authentication and User/Organization Management
- usehook-ts: React hooks in TS
- zustand: state management library
- mysql2: library/driver to connect to mysql db
- zod: TypeScript-first schema validation with static type inference
- unsplash: stock photography
- lodash: A JavaScript utility library delivering consistency, modularity, performance, & extras.
- hello-pangea/dnd: drag and drop for lists with React
- tanstack query: asynchronous state management
- data-fns: data utility library

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
