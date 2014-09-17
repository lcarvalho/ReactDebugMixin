# ReactDebugMixin #

A React.js Debug mixin, for creating a nested visual representation in your developer console.

### Why ? ##

This mixin will create console.groups automatically for each component Stage, to visualize what is happening with your component(s)
It also tracks the time it takes between initial Mount and subsequent Updates of the component (through console.time)

### Setup ###

Include the mixin:

	mixins: [ReactDebugMixin]


### How to use? ###

In your componentWillMount, call:

    this.debug(componentName, stateKey, collapseBool)

### Attrs ###

* componentName
** this is the name of the component, for reference, you can give any name you like

* stateKey
** optional attribute to output a specific `this.state[stateKey]` in each stage

* collapseBool
** optional boolean to collapse the console.groups

### Notes ###

Only state is included as an optional attribute, because states are supposed to change a lot, whereas props should be changed sparingly. And only displaying one state key, will help devs to focus on one thing at a time.
Although, because the groups are mosty spread across different component stages, anything console.logged in between will be visually nested inside these states, to get a good overview of what is happening.