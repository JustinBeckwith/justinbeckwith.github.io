---
layout: post
title: Virtual Labs
category: projects
tags:
  - CMU
  - Education
  - Projects
  - Virtual Labs
  - VMWare
  - VTE
status: publish
type: post
published: true
excerpt: >
  When a student takes a course in chemistry, it is often accompanied by a hands on lab.  After sitting through a lecture, and performing homework, students need to reinforce the learned concepts by doing.  Why should technology education be any different?  VTE Virtual Labs provide a sand-boxed environment for students to practice interacting with simple or complex ephemeral computing environments.  These environments may be designed by a course instructor or instructional designer to promote learning by interacting with a real (as real as it needs to be) system.  Especially useful for security research, these systems may contain full environments including domain controllers, mail servers, web servers running various versions of Windows or Linux.  You can even configure internal routing and switching between virtual hosts.  Students can install malware, viruses, bots, hacking tools, anything they want - and when they're finished, the environment is completely disposed, with no harm done.
---

![Lab Header](/images/2010/12/lab-header.png)

When a student takes a course in chemistry, it is often accompanied by a hands on lab. After sitting through a lecture, and performing homework, students need to reinforce the learned concepts by doing. Why should technology education be any different? VTE Virtual Labs provide a sand-boxed environment for students to practice interacting with simple or complex ephemeral computing environments. These environments may be designed by a course instructor or instructional designer to promote learning by interacting with a real (as real as it needs to be) system. Especially useful for security research, these systems may contain full environments including domain controllers, mail servers, web servers running various versions of Windows or Linux. You can even configure internal routing and switching between virtual hosts. Students can install malware, viruses, bots, hacking tools, anything they want - and when they're finished, the environment is completely disposed, with no harm done.

Designed at the Software Engineering Institute of Carnegie Mellon University, students and interact with the system entirely over the web, in the browser. It combines an ASP.NET MVC back end with client elements including JQuery and Adobe Flex. The back end infrastructure includes a BigIP F5, NetApp SAN, Cisco ASA, and vSphere cluster.

### The Student Perspective

After watching a presentation on a particular technical topic, the student may be asked to practice their new skill inside of a virtual lab. To prepare for the lab, VTE also provides demos and quizzes. From a course syllabus, the student will select the lab they would like to launch:

![Course Outline](/images/2010/12/course-outline.png)

This will start spooling up the required virtual machines and networking gear in vSphere. The student is presented with a structured set of tasks they are expected to perform in order to reinforce the concepts taught in the previous lecture. As each task is completed, the student's progress is saved, and they may come back at a later time to complete the lab:

![Lab Player - The Platform and Task View](/images/2010/12/lab-player-1.png)

Students may select any of the virtual machines from the lab platform, and engage in a VNC session that is performed using adobe flash. The system is capable of establishing a standard VNC socket connection over 5900 or using a comet style connection to proxy the data over 80/443. The system should behave just like administering any other remote system:

![Lab Player - Completing a Task](/images/2010/12/lab-player-3.png)

After the student completes the required steps, they are free to submit the lab, and continue on with the other work in their course.

### The author perspective

Instructors, content authors, and instructional designers have the ability to author their own virtual lab environments. After creating a new lab, you have the option to start with a list of predefined templated virtual machines, similar to what Amazon EC2 provides it's users:

![Lab Author - Base Disks](/images/2010/12/lab-author-step2.png)

In this example, I am only going to use a single virtual machine. It's entirely acceptable to use multiple virtual machines and multiple networking devices. After all of the machines have been dragged to the stage, they need to be prepared for an initial task authoring state. All this really means is that we're going to copy the base image we started with, and make any changes needed for the specifics of this lab. Examples would include installing custom software, installing the latest patches, or creating files needed in order to the complete the lab. The final state of these machines in this step will represent the first step students see when they launch the exercise:

![Lab Authoring - Preparing the Virtual Machines](/images/2010/12/lab-author-step3.2.png)

After the author has placed all of the machines in the desired start state, you can begin writing out the individual tasks of the lab. For longer labs, several exercises may be used. A single exercise should encompass a single task that may be completed in a sitting. Several exercises may be combined to create a lab with a broader theme. For example, if you wanted to create a lab on securing Linux, you would like have multiple exercises including 'Installing and configuring the firewall', and 'User management'. An exercise may contain multiple tasks - a task is a simple task that be completed relatively quickly. Tasks contain a brief description on what the student is supposed to be doing in this particular step, and may contain a screen-shot of the desired result:

![Lab Authoring - Tasks](/images/2010/12/lab-author-step4.2.png)

Upon completion of these steps, the lab can be made available to students.

For more information, visit [Virtual Labs](https://vte.cert.org/labs/).
