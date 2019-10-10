---
title: CORN Alarm clock
layout: post
js: links.js
---

## Intro to CRON

CRON is a Unix based task scheduler.
It runs a daemon[^daemon] based on file, that looks like this:

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
```

Let's have a look at the jobs we currently have scheduled (for the current user):
```bash
$ crontab -l
no crontab for john
```

We can add a CRON job to maintain our package system every evening with:
```bash
$ crontab -e
```
And adding the line:
```bash
0 0 * * * sudo apt update && sudo apt upgrade && sudo apt full-upgrade
```
Which updates, upgrades and checks for distro updates every day at Midnight. This would turn our debian based operating system into an arch-like rolling release distro.

## Making our alarm clock
For playing the alarm sound, we will be using a package called `sox`. We can install this via:
```bash
sudo apt install sox
sudo apt install sox libsox-fmt-all
```
Sox uses the `play` command:
```bash
play file_path.extension
```

So we can add `30 7 * * * play /home/<user>/Music/alarm.mp3` to play our alarm clock every day at 7 o'clock, where `<user>` is your username.

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
30 7 * * * play /home/<user>/Music/alarm.mp3
```

This is works well, except when you have a different sleep schedule for different days.

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
30 9 * * 1-5 play /home/<user>/Music/weekend_alarm.mp3
00 7 * * 0,6 play /home/<user>/Music/weekday_alarm.mp3
# 30 7 * * * play /home/<user>/Music/alarm.mp3
```

<!--footnotes-->

[^daemon]: Daemon: A program that runs in the background
