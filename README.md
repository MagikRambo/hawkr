# Hawkr

A Hawker is "defined as a person who travels around selling goods, typically advertising them by shouting" Our application aims to connect street entertainers, vendors and popup food sellers with their clients in a seamless easy to use web app.

![hawkr_team_50](https://capstone-cs.eng.utah.edu/groups/hawkr/-/wikis/uploads/e3b7eb83aa7becf443fefb8d9fa855a6/hawkr_team_50.jpg)

Authors: Alex Romero, Zixuan Zhang, Mike Marambio

Link to published cloud site: [hawkr.dev](https://www.hawkr.dev)

[Formalized Team Project Writeup](https://docs.google.com/document/d/1lMkBMix7LFE7FiyNj-BaNz_ERZAy1MkaqYW19PvmWDU/edit?usp=sharing)

#

**Table of Contents**

[[_TOC_]]

## Project Summary
Hawkr is a Website/Mobile application which intends to bridge the gap between mobile vendors and cutomers/clients. Using AWS Services, React, NextJs, Tailwind, Supabase, and Google Maps API's we intend to create an all in one application which will create and bring these mobile vendor communities together.

## Complete Project Description (abstract)
In the world of small mobile businesses location is critical, but often left unknown to the clients. Pop-up shops, and food trucks are often difficult to track down since they often move from location to location, thus making it difficult for customers to find where their favorite businesses are. Tourists, visitors, and those looking to try something new find locating mobile businesses without knowing of them first is virtually impossible. The solution to this is Hawkr. The Hawkr app will serve all small mobile vendors connecting them with customers who are interested in supporting them. This means that everyone in the entire community can locate and identify new and existing businesses in the vicinity through the use of Hawkr’s mapping. 

To reach the widest audience possible, the first implementation of this project will be focused on developing a web-app. 
If time allows we will extend it to a dedicated mobile application. Through the use of this web-app, you’ll find your favorite mobile businesses and identify new ones!

## Target Audience 

This project is catered towards people who are interested in the mobile business market(e.g finding an new/recent shop). Mobile businesses will be interested in using Hawkr to attract larger traffic of consumers interested in their services/products. To reach the largest audience possible there is no limitation on the category of what a mobile businesses can provide. Thus consumers/users be able to find their favorite businesses as well as identify new ones.

## Team Meeting day/times (in person and virtual)

Every Monday at 7P.M our sprints are planned and we discuss any current hurdles we are having.

Every Friday at 7P.M, we will meet to work on the current assignments, recap, or discuss anything of importance for the following week.

## Summary of Technologies

Task Manager: Gitlab

Versioning System: Git

Project language(s): Javascript/Typescript Frameworks: NodeJS, NextJS, Express, TailwindCSS

Hosting Service/Cloud Provider: Amazon Web Services(AWS), Supabase(for our database)

Platforms Supported: Web App (If time allows we may turn/port the site into an app on iOS, and Android Application)

Databases used: Supabase ~ PostgreSQL



##

# How to build and run the project

To build and run Hawkr there are several different avenues one could take. For our purposes, we have primarily hosted the site on AWS and Amplify(Using Route53 for domain routing).

### Requirements

1. **Supabase tables and .env file.** The project was built in conjunction with the Supabase API. An account with a respective database and tables are required. Below are the table names, and properties. Once an account is created be sure to create a .env file in the root directory with your Supabase credentials.


##### profiles
| UUID(uuid)  | state(int2) | name(varchar) | description(varchar) |
| ------ | ------ |------|------|

##### shops
| shopID(uuid)  | vendorID(uuid) | shopName(varchar) | shopDescription(varchar) | open(bool) | timeOpen(time) | timeOpen(time) | messagesOn(bool) | liveTracking(bool) | hawkrType(varchar) | shop_image_url(text) |
|------|------|------|------|------|------|------|------|------|------|------|

##### locations
| UUID(uuid)  | location(json) |
| ------ | ------ |

##### favoritesList
| clientID(uuid)  | shopID(uuid) |
| ------ | ------ |

##### messages
| messageID(uuid)  | clientID(uuid) | shopID(uuid) | content(json) |
| ------ | ------ |------|------|


The default authentication table for Supabase is below:
| Email  | Phone | Provider | Created | Last Sign In | User UID |
| ------ | ------ |------|------|------|------|

2. **npm install.** 



__Note that the project looks and performs best on Google Chrome__

## How to build in AWS

Suspendisse accumsan ut arcu nec scelerisque. Ut odio ante, gravida ac malesuada non, sagittis eu urna. Mauris nec gravida ante, sed lacinia nibh. In eu urna bibendum, semper quam eu, condimentum ex. Vivamus vitae metus commodo, elementum nibh sit amet, tincidunt velit. In vel aliquam ex. Proin fermentum, risus eget semper lobortis, ligula tortor egestas augue, ac condimentum elit augue vitae velit. Suspendisse pretium egestas erat, at elementum sapien dignissim in. Aliquam cursus, leo vel malesuada varius, eros nisl pretium dui, a sagittis dui ipsum rutrum urna. Aenean vulputate dolor nisi, et suscipit eros interdum ac. 

## How to build in Vercel

Morbi orci diam, malesuada non ligula et, sagittis mattis sem. Vivamus nulla purus, aliquam nec consequat in, aliquet vitae purus. Mauris varius hendrerit ex. Nullam posuere mi mi, nec vehicula nulla molestie eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus sit amet facilisis nibh. Duis in lorem molestie, fermentum ante eget, varius sapien. Phasellus dapibus convallis ullamcorper. Sed vel maximus massa. Maecenas pretium varius ornare. Etiam quis ipsum nisl. Donec accumsan auctor ipsum, semper varius augue tempor eu. Sed odio quam, porttitor eget consectetur eu, rutrum quis odio. Praesent cursus sed massa sed iaculis. 

## How to run the project locally

1. In the project folder run 'npm run dev' to run the project locally. If you plan to run the the project on hosting service. You can use 'npm run build' instead.

2. The project should now output were it is being hosted from in the terminal/command line. Feel free to visit it in any browser. 

#

The project has also been tested and is also hosted as a Vercel project [here](https://undergrad-capstone-2023.vercel.app/explore).

> This page will be maintained and updated this page throughout the semester.

