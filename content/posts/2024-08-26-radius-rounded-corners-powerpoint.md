---
title: Equal radius of rounded corners in PowerPoint
subtitle: This was way harded than it should have been.
date: 2024-11-12
---

I needed to make a poster for an upcoming conference.
This was the first one I had to do myself from scratch.
I chose to do this one in PowerPoint.

![Example text box](/posts_attachments/radius_rounded_corners_powerpoint/example_text_box.png)

The layout I had in mind is made up of many differently sized text boxes as shown above.
These are made using two rounded rectangles aligned at the upper left and a text box in the middle.
Rounded corners look fancy and I fancied myself making a poster with them.
The rounded corners should have the same radius of course.
Especially, as the rounded corners of the two rounded rectangles should align perfectly in the upper left corner.
However, there is no way to set an explicit radius for those shapes, only the yellow little slider.
This shouldn't be a problem, right?
As long as the radius of all rectangles is the same.

<img src="https://vg07.met.vgwort.de/na/3b8fcc8042b041ad9f24257456f49a56" width="1" height="1" alt="">

# The problem

The text boxes are differently sized across the poster.
Thus, I copied, resized, and was disappointed.
Once the rounded corners' radius is set, one might think that it stays the same.
False.
When dragging to adjust the size of the rectangle, the radius changes in relation to the size of the rectangle.

![Resizing the rounded rectangle](/posts_attachments/radius_rounded_corners_powerpoint/resizing_text_box.gif)

I guess this makes sense for 51% of the cases, although I can only think of a bunch in the 49% category.

# The solution

So there was no way that I would adjust all text boxes manually by dragging.
Especially, as I would have had to do it over and over again during the poster development.
Googleing revealed that there is really is no explicit way to set the radius.
It can only be done indirectly using VBA, as suggested [here](https://answers.microsoft.com/en-us/msoffice/forum/all/how-can-i-change-corner-radius-in-powerpoint/2360dd1a-00a8-474a-aa2d-c7fe5177a067).

I had used VBA only once before.
I had copied some VBA from stackoverflow to create a progress bar on my presentation slides.
Since that had worked well, I decided to out source some of the work to my dear and knowledgeable colleague ChatGPT.
Although the script it produced did not work, it took me 5 minutes of debugging to get it to work.
ChatGPT's version used a function, which did not work.
I got rid of that function call, as it did not affect my use case.
Thus, the completed script as follows:

```vba
Sub SetAbsoluteRoundedCornerRadius()
    Dim slide As slide
    Dim shape As shape
    Dim desiredRadius As Single
    Dim relativeRadius As Single
    Dim minDimension As Single

    ' Set the desired absolute radius here (in points)
    desiredRadius = 10 ' Change this value to your preferred absolute radius

    For Each slide In ActivePresentation.Slides
        For Each shape In slide.Shapes
            ' Check if the shape is a rectangle with rounded corners
            If shape.Type = msoAutoShape And shape.AutoShapeType = msoShapeRoundedRectangle Then
                ' Get the minimum dimension (width or height) of the rectangle
                ' minDimension = Application.WorksheetFunction.Min(shape.Width, shape.Height)
                minDimension = shape.Height

                ' Calculate the relative radius based on the desired absolute radius
                relativeRadius = desiredRadius / (minDimension / 2)

                ' Ensure the relative radius is between 0 and 1
                If relativeRadius > 1 Then
                    relativeRadius = 1
                End If

                shape.Adjustments.Item(1) = relativeRadius
            End If
        Next shape
    Next slide

    MsgBox "All rounded rectangle corners have been set to the same absolute radius."
End Sub
```

The ChatGPT version tried to determine the minimum dimension of the rectangle, i.e., height or width.
However, as my text boxes are always wider than they are high, I decided to stick to the height only.

To use it, open the VBA editor with Option+F11 (Alt+F11 on Windows) and run it.
This will resize all rectangles with rounded corners on all slides.
Although not a perfect solution, I am quite happy with the result.
